import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class ApiService {

    private idToken: string;

    constructor(private http: Http) {
    }

    private getHttpOptions(): RequestOptions {
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.idToken });
        const options = new RequestOptions({ headers: headers });
        return options;
    }

    public setIdToken(token: string): void {
        this.idToken = token;
    }

    public getVersions(): Observable<any> {
        const url = `${environment.apiGatewayUrl}versions`;
        console.log('Calling the API %s, with token %s', url, this.idToken);
        return this.http.get(url, this.getHttpOptions())
            .map(x => {
                return x.json();
            });
    }
}
