import { Component, EventEmitter,  OnInit, Output } from '@angular/core';
import { CognitoService } from '../../services';
import { User } from '../../models';
import { Observable } from 'rxjs/observable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private cognitoService: CognitoService) { }

  errorMessage: string;
  successMessage: string;
  user: User = new User();
  requireSignup: boolean;
  requireConfirmation: boolean;
  userConfirmed: boolean;
  confirmationFailed: boolean;
  @Output() closeSignup = new EventEmitter();

  ngOnInit() {
    this.requireConfirmation = false;
    this.requireSignup = true;
  }

  public signup(): void {
    // const user: User =  {
    //   'givenName': 'arvin',
    //   'phoneNumber': '+6597501628',
    //   'email': 'arvin_benitez@yahoo.com',
    //   'password': 'P@55w0rd'
    // };
    console.log('I got here: 1');
    this.cognitoService.signUp(this.user, (err, data) => {
      if (err) {
        this.errorMessage = 'Error';
        console.log('Error: ', err);
      }
      if (data) {
        this.successMessage = 'Suggest';
        this.requireConfirmation = true;
        this.requireSignup = false;
        console.log('Success: ', data);
      }
    });
  }

  public cancelSignup(): void {
    console.log(this.user);
  }
  public confirm(): void {
    this.cognitoService.confirmSignup(this.user, (err, data) => {
      if (err) {
        this.confirmationFailed = true;
        console.log('There was an error with the confirmation', err);
      }
      if (data) {
        this.userConfirmed = true;
        this.requireConfirmation = false;
        this.requireSignup = false;
        this.confirmationFailed = false;
      }
    });
  }

  public close(): void {
    this.closeSignup.emit();
  }
}
