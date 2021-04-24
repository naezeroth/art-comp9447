# Automated Remediation Tool (ART) 

## Demo 
https://www.youtube.com/watch?v=uOVrfKkf4A4

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

## Slack Installation

Firstly, navigate to https://api.slack.com/apps 
![image](https://user-images.githubusercontent.com/43486117/115948817-c69be800-a513-11eb-802e-986f211239a2.png)

![image](https://user-images.githubusercontent.com/43486117/115948821-cbf93280-a513-11eb-8a9b-efc2dea49d08.png)

Complete the form, in my case I will use “test_app” for the App Name and choose “COMP9447 21T1” Channel for Development Slack Workspace. (You will see your own channel)

Then click “Create App”

![image](https://user-images.githubusercontent.com/43486117/115948824-d9aeb800-a513-11eb-9243-4a20f7687910.png)

Click “OAuth & Permissions” on the left NavBar, scroll down to the Scopes section.

![image](https://user-images.githubusercontent.com/43486117/115948832-e4694d00-a513-11eb-8eb6-778545f3038c.png)

Click on “Add an OAuth Scope” for Bot Token Scopes and add chat:write permission

![image](https://user-images.githubusercontent.com/43486117/115948840-ef23e200-a513-11eb-8494-e896c9c9a201.png)

Scroll up and click Install to Workspace

![image](https://user-images.githubusercontent.com/43486117/115948852-fd71fe00-a513-11eb-96ad-db260e69b58b.png)

![image](https://user-images.githubusercontent.com/43486117/115948856-019e1b80-a514-11eb-9e39-ed4f67f749a4.png)

Click Allow

![image](https://user-images.githubusercontent.com/43486117/115948859-0793fc80-a514-11eb-9934-6626c2157060.png)

You will be able to get Bot User OAuth Token from “OAuth & Permissions” page, copy the Token and goto .env file in the root directory.

![image](https://user-images.githubusercontent.com/43486117/115948868-124e9180-a514-11eb-95c8-dd3f168db31a.png)

Paste the token starting with xoxb into SLACK_TOKEN & now navigate to Interactivity & Shortcuts page on Slack API Settings

![image](https://user-images.githubusercontent.com/43486117/115948873-1b3f6300-a514-11eb-919d-40ff80775b25.png)

Turn on Interactivity settings

![image](https://user-images.githubusercontent.com/43486117/115948877-22667100-a514-11eb-9903-d24ab79ac7a1.png)

You will require to provide an HTTPS url to receive a response from an interactive message.
If you don’t have url with ssl, refer to this document and follow the instruction (where it mentions about ngrok)
https://slack.dev/node-slack-sdk/tutorials/local-development

## Docker build:

```
docker build -t artsoar/art .
```
