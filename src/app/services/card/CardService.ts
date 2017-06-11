import { Injectable } from '@angular/core';
import { HttpClient } from '../http/HttpClient';
import { environment } from '../../../environments/environment';

@Injectable()
export class CardService {
    private lastCardSentTimestamp: number;
    public loading = true;

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

    public cardWasSentInThisMonth(): boolean {
        const now = new Date();
        const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return this.lastCardSentTimestamp > firstDayOfCurrentMonth.getTime();
    }
}
