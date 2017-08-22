# map-generator

## Summary
Script accepts an input data in .xlsx file and generates an output of pdf documents containing maps with travel directions. Input files are located in the **inputData** directory, pdf files are written to the **outputData** folder.

Script is designed to be run in multiple instances. Every instance processes its own input file using its own API key. 

Once the script execution is complete an email notification is sent to a specified list of email addresses. If error occurrs, an email notification with an error details will be sent. 

Script writes error logs into **error.log** file. 

If Google API does not return any routes or returns an error "NOT FOUND", script doesn't crush. It continues execution, and the skipped entry details are written into error.log file. 

Google API daily request quota usage: [https://console.developers.google.com/iam-admin/quotas](https://console.developers.google.com/iam-admin/quotas)

## Environment
### Requirements:
* Node 6.11+
* NPM

[Download](https://nodejs.org/en/download/) and install NodeJS and Node package manager. Refer to the following guides: [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager), [https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04)

## Installation

1. Create a project directory where the files will be stored
2. Open terminal in this directory and execute commands:
  * `git init`
  * `git remote add origin https://github.com/OleksiiShevchenko/map-generator.git`
  * `git pull origin master`
3. Install node packages via NPM: execute command `npm install`
4. Install pm2 process manager globally: `npm install -g pm2`

## Configuration

1. Configure script's config file, that is located in `/src/config/index.js`.
 
 * googleMapsAPI:
   * `key` - default google directions API key, that will be used for tests and development mode. The key can be generated [here](https://console.developers.google.com/apis/library). Note that you need to enable **Google Maps Directions API** and **Google Static Maps API** for the software to work properly. Application can have only one default API key in its configuration file.
 
   * `destination` - enter route destination
 
   * `mode` - enter transportation mode for google map. Currently only **driving** is supported.  

* nodemailer:
You can adjust gmail account used for sending email notifications by changing the following fields:
  * `name` - a sender's name, that appears in the email client,
  * `sender` - sender's address
  * `opts/auth/user` - gmail account login
  * `opts/auth/pass` - gmail account password

**Important:** If you change a related google account you need to enable usage of less secure apps for it - https://myaccount.google.com/lesssecureapps

* notificationRecipients - enter comma-separated list of emails that notifications should be sent to

2. pm2 configuration - open **pm2.json** in the root of the project. 
Every object in the "apps" array represents an instance of the script. You have to specify 2 params:

* `DATA_SRC` - (required) a source xlsx file. It is recommended to separate large xlsx tables into smaller files, and let every instance process its own one. For example if you have a database of 35k entries, you can split it into multiple files 2400/5000 each (depending if you use paid API key or free) and let have 7-15 instances of the script to process these files.

* `KEY` - stands for the Google API key. You can provide individual key for each instance, each key has a limit of 2500 daily requests. If you don't provide this parameter application will use default key from config file. 

## Running the script

* To start a script in development mode use command `npm start`. It will process 1 entry and generate 1 file (1.pdf). It is used for testing and development. 

* To execute script in a production mode use `pm2 start pm2.json`. Once the app is started, you can see list of all processes and their status via command `pm2 list`. To see logs in real time use command `pm2 logs` or `pm2 logs map-generator1` to see logs for particular instance of the script.

## Tests

To run a test suite use `npm test` command



