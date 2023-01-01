from pymongo import MongoClient
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
import time
import pyautogui as pt
import os
from dotenv import load_dotenv
load_dotenv()

twitter_uname = os.environ['Twit_Uname']
twitter_pwd = os.environ['Twit_Pass']
MONGO_URI = os.environ['MONGO_URI']

# Connect to the MongoDB server
client = MongoClient(MONGO_URI)
Chrome_Driver = "C:\\Program Files (x86)\\chromedriver.exe"
# Get a reference to the "my_database" database and the "my_collection" collection
db = client['test']
collection = db['scammers']

# Find all documents in the collection
cursor = collection.find()

# Iterate over the documents


while 1:
    # Find all documents in the collection where the "name" field is "John"
    scammers = collection.find_one({"reported": "false"})
    scammer_uname = scammers['username']
    if scammer_uname == "roqqupay":
            print("Avoiding Original")
            scammers = collection.find_one({"reported": "false"})
            scammer_uname = scammers['username']
            scammers = collection.find_one_and_update({'username':scammer_uname},
                                    { '$set': { "reported" : 'true'} }),

    else:
            print(scammer_uname)
            #Write logic for reporting



            driver = webdriver.Chrome(Chrome_Driver)
            driver.get("https://twitter.com")

            time.sleep(5)

            login_button_0 = driver.find_element("xpath","/html/body/div/div/div/div[1]/div/div[1]/div/div/div/div[2]/div[2]/div/div/div[1]/a/div/span/span")
            login_button_0.click()

            time.sleep(6)

            enter_mail = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div[5]/label/div/div[2]/div/input")
            enter_mail.send_keys(twitter_uname)

            next_button_1 = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div[6]/div")
            next_button_1.click()

            time.sleep(5)

            pass_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div/div[3]/div/label/div/div[2]/div[1]/input")
            pass_button.send_keys(twitter_pwd)

            login_button_1 = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div[1]/div/div/div/div")
            login_button_1.click()

            time.sleep(10)

            print("Logged in...")

            search_bar = driver.find_element("xpath","/html/body/div[1]/div/div/div[2]/main/div/div/div/div[2]/div/div[2]/div/div/div/div[1]/div/div/div/form/div[1]/div/div/div/label/div[2]/div/input")
            search_bar.send_keys(scammer_uname)
            pt.press('enter')  # press the Enter key to proceed the search

            time.sleep(2)

            people_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[1]/div[1]/div[2]/nav/div/div[2]/div/div[3]/a/div/div")
            people_button.click()

            time.sleep(3)

            click_profile = driver.find_element("xpath","/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/section/div/div/div[1]/div/div/div/div/div[2]")
            click_profile.click()

            time.sleep(3)

            time.sleep(10)
            mini_drop = driver.find_element("xpath","/html/body/div[1]/div/div/div[2]/main/div/div/div/div[1]/div/div[3]/div/div/div/div/div[1]/div[2]/div[1]/div")
            mini_drop.click()

            time.sleep(2)
            report_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div[2]/div/div[3]/div/div/div/div[5]/div[2]/div")
            report_button.click()

            time.sleep(5)
            start_report_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div")
            start_report_button.click()

            time.sleep(4)

            for_someoneIKnow_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[2]/div/label[2]/div[2]/input")
            for_someoneIKnow_button.click()

            next_button_2 = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div/div")
            next_button_2.click()

            pt.hotkey('ctrl', '-')
            pt.hotkey('ctrl', '-')
            pt.hotkey('ctrl', '-')

            time.sleep(3)

            imp_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[2]/div/label[4]/div[2]/input")
            imp_button.click()

            next_button_3 = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div/div")
            next_button_3.click()

            time.sleep(3)

            imp_button_1 = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[1]/div/div[2]/div/label[2]/div[2]/input")
            imp_button_1.click()

            next_button_4 = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div/div")
            next_button_4.click()

            time.sleep(3)
            
            continue_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div[1]/div")
            continue_button.click()

            time.sleep(3)

            submit_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div/div")
            submit_button.click()

            time.sleep(5)
            done_button = driver.find_element("xpath","/html/body/div[1]/div/div/div[1]/div[2]/div/div/div/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[2]/div/div/div/div/div")
            done_button.click()
            print("reported")
            scammers = collection.find_one_and_update({'username':scammer_uname},
                                    { '$set': { "reported" : 'true'} }),

            savefile = open("blocked.txt","w")
            savefile.write(scammer_uname)
            savefile.close()