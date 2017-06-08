import { Injectable } from '@angular/core';
import { HttpClient } from '../http/HttpClient';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    private userName: string;
    private flatNumber: number;

    constructor(private httpClient: HttpClient) {
    }

    public getUserName(): string {
        return this.userName;
    }

    public setUserName(userName: string) {
        this.userName = userName;
    }

    public getFlatNumber(): number {
        return this.flatNumber;
    }

    public setFlatNumber(flatNumber: number) {
        this.flatNumber = flatNumber;
    }

    public requestUser(): void {
        this.httpClient.get(environment.apiUrl + '/api/user')
            .subscribe(result => {
                const responseData = result.json();
                this.setUserName(responseData.name);
                this.setFlatNumber(responseData.flatNumber);
            });
    }
}
