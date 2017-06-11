import { Injectable } from '@angular/core';
import { HttpClient } from '../http/HttpClient';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardService {
    private cardSendEnable = true;

    constructor(private httpClient: HttpClient) {
    }

    public isCardSendEnable(): boolean {
        return this.cardSendEnable;
    }

    public setCardSendEnable(cardSendEnable: boolean) {
        this.cardSendEnable = cardSendEnable;
    }

    public requestLastCard(): void {
        this.httpClient.get(environment.apiUrl + '/api/card/last')
            .subscribe(result => {
                const responseData = result.json();

                const ago20days = new Date();
                ago20days.setDate(ago20days.getDate() - 20);
                const ago20daysTimestamp = Math.round(ago20days.getTime() / 1000);

                this.cardSendEnable = responseData.createdAt < ago20daysTimestamp;
            });
    }
}
