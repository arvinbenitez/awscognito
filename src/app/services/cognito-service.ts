// import * as AWS from 'aws-sdk';
import { CognitoIdentity, CognitoIdentityCredentials, CognitoIdentityServiceProvider } from 'aws-sdk';
import { environment } from '../../environments/environment';
import { User } from '../models';
import AWS = require('aws-sdk');
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

export class CognitoService {

  userPool: CognitoIdentityServiceProvider;
  /**
   *
   */
  constructor() {
    AWS.config.region = environment.awsRegion;
    AWS.config.credentials = new AWS.Credentials({
        accessKeyId: environment.accessKey,
        secretAccessKey: environment.secretAccessKey
      });

    console.log('I got here: 2');
    const poolData: any = {
      UserPoolId: environment.cognitoPoolId,
      ClientId: environment.cognitoClientId
    };
    this.userPool = new CognitoIdentityServiceProvider(poolData);
  }
  public signUp(userData: User, callback: any): void {

    const signupRequest = {
      ClientId: environment.cognitoClientId, /* required */
      Password: userData.password, /* required */
      Username: userData.email, /* required */
      UserAttributes: [
        {
          Name: 'given_name', /* required */
          Value: userData.givenName
        },
        {
          Name: 'email', /* required */
          Value: userData.email
        },
        {
          Name: 'phone_number', /* required */
          Value: userData.phoneNumber
        },
      ],
    };

    this.userPool.signUp(signupRequest, (err, data) => {
      callback(err, data);
    });
  }

  public confirmSignup(userData: User, callback: any): void {
    const params = {
      ClientId: environment.cognitoClientId, /* required */
      ConfirmationCode: userData.confirmationCode, /* required */
      Username: userData.email, /* required */
    };
    this.userPool.confirmSignUp(params, function (err, data) {
      callback(err, data);
    });
  }

  public signIn(userData: User, callback: any): void {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH', /* required */
      ClientId: environment.cognitoClientId, /* required */
      AuthParameters: {
        'USERNAME': userData.email,
        'PASSWORD': userData.password
      }
    };
    console.log(params);
    this.userPool.initiateAuth(params, (err, data) => {
      callback(err, data);
    });
  }
}
