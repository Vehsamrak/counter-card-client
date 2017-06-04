import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class Authenticator {
    private currentTokenStorageKey = 'currentToken';

    constructor(private http: Http) {
    }

    login(email: string, password: string) {
        return this.http.post(environment.apiUrl + '/api/login', {login: email, password: password})
            .map((response: Response) => {
                const token = response.json();

                if (token) {
                    localStorage.setItem(this.currentTokenStorageKey, token);
                }
            });
    }

    logout() {
        localStorage.removeItem(this.currentTokenStorageKey);
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem(this.currentTokenStorageKey) !== null;
    }
}
