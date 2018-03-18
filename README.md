# AWS Cognito User Pool Demo 
## by Arvin Benitez

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## How It Works

### Configure the Cognito User Pool Using the AWS Console

* Login to the AWS Console, navigate to the Cognito Service and create a new user pool
* Settings
  * Provide a meaningful pool name
  * You can either 'Review the Defaults' or Step Through the Settings
  * Go to 'Attributes' and configure the necessary attributes. 
    * User Name
    * Select any standard attributes that you want to mark as required (e.g. GivenName, Phone, etc)
    * Add any custom attributes (if required)
  * Go to 'App Clients' and create an application client. For Javascript Apps, make sure that 'Generate Client Secret' is not ticked.
    * Enable the USER_PASSWORD_AUTH option. This would allow you to initiate the authentication using username and password.
  * Take note of the following details that you need on your application:
    * Pool Id. This will be in the format **eu-west-1_XXXXXX**
    * App Client Id. 

### Configure the API Gateway Using the AWS Console

Assuming you already have an API Gateway resource pointing to either a Web Api or an AWS Lambda, the Cognito User Pool can be used to authorize incoming requests by requiring an authorization token to be passed to the API request.

* From the API Gateway, navigate to the API.
* On the Authorizers, create a new 'Cognito' authorizer. Choose the Cognito User Pool created.
* Define the header key to associate the token with
* Once the authorizer has been associated to the API, go into each individual resource. Edit the method and set the Authorizer to be the Cognito Authorizer created in the previous step.
* Optional? Enable CORS on the resource.
* Re-deploy the API for the changes to take effect.

### How Does The Sample Code Work?

The sample code uses the [AWS Javascript SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html). 
* The Cognito User Pool configuration allows the user to self-register using **CognitoIdentityServiceProvider.signup()** api
* After registration, the user receives a confirmation code on the specified email. The user status would be 'UNCONFIRMED' at this point.
* The user would then need to confirm the email by entering the 'confirmation code', calling the **CognitoIdentityServiceProvider.confirmSignup()**. If successful, the users status would be 'CONFIRMED' at this stage.
* At this point, the user can then signin. The **CognitoIdentityService.initiateAuth()** is then called to initiate the authentication process. Note that this call requires that an AWS Credential be passed (e.g. using AccessKey and SecretAccessKey).
  * For this sample app, the AccessKey and Secret are defined in the CognitoService. This is unsecure. In real apps, we may just move this behind the API Gateway and add a lambda function to do the calls for InitiateAuth.
* This should give the user an AccessToken at this point. The IdToken can then be passed into the API Header which should authorize the call.

If MFA is enabled, the call to InitiateAuth should return a 'challenge' to the user to provide an MFA - can either be SMS Token or Time-Based Token. Only after a successful response to the challenge will the token be returned.

