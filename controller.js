const {Client} = require('twitter-api-sdk')
const micromatch = require('micromatch');
const Scammer = require('./models/spammersModel.js');
const axios = require('axios');
const Report = require('./models/reportLog.js');
const cron = require('node-cron');
const { response } = require('express');



// get all tweet matching a given query
async function discoverScammers (req,res) {
    let data = req.body.keyword
    let allSavedUsers = []
    let runCount = 0

    if (!data){
        return res.status(400).json({status: 'fail', message: 'Keyword is required'})
    }

    let query = data.replace(',', '\n')

    try {
      // Perform the necessary actions to discover scammers
      await Scammer.updateMany({}, { cronStatus: 'success' });
    } catch (error) {
      console.error(error);
      await Scammer.updateMany({}, { cronStatus: 'failure' });
    }

    const client = new Client(process.env.BEARER_TOKEN);

    //make a request to twitter api
    async function findScammers (nextToken){
      const response = await client.tweets.tweetsRecentSearch({
        "query": query,
        "user.fields": [
          "username"
      ],
        "max_results": 100,
        "next_token": nextToken ?  nextToken : '',
        "expansions": [
            "author_id",
            "geo.place_id"
        ]
      });

      let metaToken = response.meta.next_token

      const scammers = response.includes.users.filter(user => user.name.toLowerCase().includes('roqqu') 
      || user.name.toLowerCase().includes('roqquian') 
      || user.username.toLowerCase().includes('roqqu') 
      || user.username.toLowerCase().includes('roqquian'));
    
      // Check if any of the filtered results already exist in the database
      const allScammers = await Scammer.find({username: {$in: scammers.map(user => user.username)}});
      const existingUsernames = allScammers.map(user => user.username);
     let newFilteredScammer = scammers.filter(user => !existingUsernames.includes(user.username));
    
      // Save the filtered users to the database
      const savedUsers = await Scammer.create(newFilteredScammer);
      allSavedUsers.concat(savedUsers);

      // run the process again if metatoken exists
      if (metaToken){
        runCount++;
        findScammers(metaToken)
      } else {
        return res.status(200).json({status:'success', message: 'All scammers found and saved to db', run_count: runCount, data: allScammers});
      }

    }

    findScammers()
}



//report Scammers to twitter
async function reportScammers(req, res) {

  // Fetch scammers from the database
  const scammers = await Scammer.find({});



  // Set the API endpoint URL
  // const endpoint = 'https://api.twitter.com/1.1/report/users/:user_id';
 const endpoint = 'https://api.twitter.com/1.1/users/report_spam.json?screen_name=username&perform_block=false'


  // Set the request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
    },
  };

  try {
    // Iterate over the scammers array
    for (const scammer of scammers) {
        // Set the reason for the report
  const reason = `This report is for @roqqupay. They're being spammed. @${scammer} is doing this by posting misleading or deceptive links, leading to scams, phishing, or other malicious links. @${scammer} might be violating Twitter's platform manipulation and spam rule.
  For further information regarding this you can reach out to James at tuwatimi.james@roqqu.com 
  Thanks.`

      // If the scammer's status is not "active", skip the scammer
      if (scammer.status !== 'active' || scammer.username === 'roqqupay') continue;

      // Set the user_id in the endpoint URL
      const url = endpoint.replace('username', scammer.username);

      // Create a new FormData object and append the reason field
      const formData = new FormData();
      formData.append('reason', reason);

      // Set the body of the request to the FormData object
      options.body = formData;

      // Make the request to the API endpoint
      const response = await axios(url, options);
      console.log(response);
      await Report.create({username: scammer, message: reason});
    }

     //log the report 

    // Return a success response to the client
    return res.json({
      status: 'success',
      message: 'Scammers reported to Twitter',
      data: response,
    });
  } catch (error) {
    console.error(error);
    // Return an error response to the client
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred while reporting the scammers',
    });
  }
}


async function checkScammerStatus() {
  // Fetch scammers that have been reported to Twitter
  const reportedScammers = await Scammer.find({ reported: true });

  // Set the API endpoint URL
  const endpoint = 'https://api.twitter.com/1.1/users/lookup';

  // Set the request options
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
    },
  };

  try {
    // Iterate over the scammers array
    for (const scammer of reportedScammers) {
      // Set the user_id in the endpoint URL
      const url = `${endpoint}?user_id=${scammer.id}`;

      // Make the request to the API endpoint
      const response = await axios(url, options);

      // Get the user object from the response data
      const user = response.data[0];

      // If the user is suspended, update the status in the database
      if (user.suspended) {
        await Scammer.findByIdAndUpdate(scammer._id, { status: 'suspended' });
      }
    }
  } catch (error) {
    console.error(error);
  }
}

//retrieve all scammers from the database
async function getScammers(req, res) {
  // Fetch all scammers from the database
  try {
    const allScammers = await Scammer.find({}).select('username');
    return res.status(200).json({ status: 'success', message: "All Scammers retrieved successfully", data: {scammers: allScammers, total: allScammers.length }})

  } catch (error) {
    console.error(error);
  }
  

}
// Call the function every hour
setInterval(checkScammerStatus, 3600000);

// Schedule the cron job to run every 2 days at 00:00
cron.schedule('0 0 */2 * *', () => {
  reportScammers();
});

// Schedule the cron job to run every day at 9:00 and 21:00
cron.schedule('0 9 * * *', () => {
  discoverScammers();
});
cron.schedule('0 21 * * *', () => {
  discoverScammers();
});




module.exports = {discoverScammers, reportScammers, checkScammerStatus, getScammers};