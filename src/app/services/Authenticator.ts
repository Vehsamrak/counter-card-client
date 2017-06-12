import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { UserService } from './user/UserService';
import { CardService } from './card/CardService';

@Injectable()
export class Authenticator {
    private currentTokenStorageKey = 'currentToken';

    constructor(
        private http: Http,
        private userService: UserService,
        private cardService: CardService
    ) {
    }

    login(email: string, password: string) {
        return this.http.post(environment.apiUrl + '/api/login', {login: email, password: password})
            .map((response: Response) => {
                this.handleResponse(response);
            });
    }

    register(email: string, password: string, name: string, flatNumber: number) {
        return this.http.post(environment.apiUrl + '/api/register', {
            login: email,
            password: password,
            name: name,
            flatNumber: flatNumber,
        }).map((response: Response) => {
            this.handleResponse(response);
        });
    }

    logout() {
        localStorage.removeItem(this.currentTokenStorageKey);
    }

    handleResponse(response) {
        const token = response.json();

        if (token) {
            localStorage.setItem(this.currentTokenStorageKey, token);
        }
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem(this.currentTokenStorageKey) !== null;
    }

    public requestInitializationData(): void {
        this.userService.requestUser();
        this.cardService.requestLastCard();
        this.cardService.requestAllCards();
    }
}
