import { Component } from '@angular/core';
import { ApiService } from './services';
import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showSignup = false;
  authenticationData: any;
  apiResult: any;

  constructor(private apiService: ApiService) {
  }

  public onSignSuccess($event): void {
    this.authenticationData = $event;
    console.log('Success: ', $event);
    this.apiService.setIdToken($event.IdToken);
  }

  public callApi(): void {
    this.apiService.getVersions().subscribe(x => {
      console.log('I got a return from the api', x);
      this.apiResult = x;
    }, x => {
      console.log('Oh boy, an error', x);
      this.apiResult = x;
    });
  }
}
