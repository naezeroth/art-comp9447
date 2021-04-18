# Automated Remediation Tool (ART) 


## What is this? 

ART is designed to be a one stop SOAR app that can be installed on any AWS account. ART allows you to create flexible flows that can be used to auto-remediate any threats that may need immediate actions and stop any major breaks or potential leaks. The app is coupled with Guard Duty so that it fetches any newly generated findings, stores them and executes actions from the predefined user flows to make sure your resources are safe and secure.


## AWS Services Configuration

GuardDuty
*   Enable this service on the AWS console.

EC2
*   Create an EC2 that will host this application
*   Attach an elastic IP so the IP doesn’t change
*   Create Security group that has ingress ports 1337, 3000 enabled
*   Note external IP address/name 

SNS 
*   Create SNS topic with incoming 
*   Create SNS subscription that has a HTTP endpoint to IP address above + :1337/api/alert
*   It should look something like “[http://ec2-3-104-91-114.ap-southeast-2.compute.amazonaws.com:1337/api/alert](http://ec2-3-104-91-114.ap-southeast-2.compute.amazonaws.com:1337/api/alert)”


  	IMPORTANT: You will need to run `npm run sns-setup` to activate the service, as this will log the output of the initial security token (sent by SNS) set up which will be needed to validate the subscription.	

Amazon Eventbridge
*   Set up new rule
    *   Set up event pattern with the following options:
        *   Service Provider: AWS
        *   Service Name: GuardDuty
        *   Event Type: All events
    *   Set the SNS topic to the one created above
    *   Provide optional tags if any


## Application Installation

Clone this repository and simply run `npm install` to install dependencies. 

After this copy paste .env.template to .env and add aws account access details to it - make sure these are admin access tokens.

IMPORTANT:

When you run for the first time, run `npm run sns-setup` and copy and paste the sns code to activate the sns service for your account.

Run npm run build and then npm run production to deploy the backend and frontend servers.

Navigate to the ‘ip address:3000’ and you should see the application working.

Slack Installation
