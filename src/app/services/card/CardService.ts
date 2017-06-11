import { Injectable } from '@angular/core';
import { HttpClient } from '../http/HttpClient';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardService {
    public loading = true;
    private lastCardSentTimestamp: number;
    private cards: {};

    constructor(private httpClient: HttpClient) {
    }

    public requestLastCard(): void {
        this.httpClient.get(environment.apiUrl + '/api/card/last')
            .subscribe(
                result => {
                    const responseData = result.json();
                    this.lastCardSentTimestamp = responseData.createdAt * 1000;
                    this.loading = false;
                },
                error => {
                    if (error.status = 404) {
                        this.lastCardSentTimestamp = 0;
                    }

                    this.loading = false;
                }
            );
    }

    public requestAllCards(): void {
        this.httpClient.get(environment.apiUrl + '/api/cards')
            .subscribe(
                result => {
                    this.cards = result.json();
                    this.loading = false;
                },
                error => {
                    console.log(error);

                    this.loading = false;
                }
            );
    }

    public cardWasSentInThisMonth(): boolean {
        const now = new Date();
        const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return this.lastCardSentTimestamp > firstDayOfCurrentMonth.getTime();
    }
}
