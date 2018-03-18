import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models';
import { CognitoService } from '../../services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  showSignup = false;
  constructor(private cognitoService: CognitoService) { }
  user: User = new User();
  authenticationResult: any;
  signinFailure = false;
  @Output() signinSuccess = new EventEmitter<any>();

  ngOnInit() {
  }

  public login(): void {
    this.cognitoService.signIn(this.user, (err, data) => {
      if (err) {
        this.signinFailure = true;
      }
      if (data) {
        this.authenticationResult = data.AuthenticationResult;
        this.signinSuccess.emit(this.authenticationResult);
      }
      console.log(err, data);
    });
  }

  public onCloseSignup($event: any): void {
    this.showSignup = false;
  }

}
