import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Authenticator {
    private currentUserStorageKey = 'currentUser';

    constructor(private http: Http) {
    }

    login(email: string, password: string) {
        return this.http.post('/api/login', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                const user = response.json();

                if (user && user.token) {
                    localStorage.setItem(this.currentUserStorageKey, JSON.stringify(user));
                }
            });
    }

    logout() {
        localStorage.removeItem(this.currentUserStorageKey);
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem(this.currentUserStorageKey) !== null;
    }
}
