import { Component } from '@angular/core';
import { CardService } from "../../services/card/CardService";
import { DateProcessor } from "../../services/DateProcessor";

@Component({
    selector: 'component-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent {

    constructor(
        private cardService: CardService,
        private dateProcessor: DateProcessor
    ) {
    }

    public getCards() {
        return this.cardService.getCards();
    }

    public getCardMonthName(cardTimestamp: number) {
        let date = new Date(cardTimestamp * 1000);
        return this.dateProcessor.getMonthName(date.getMonth());
    }

    public getCardDay(cardTimestamp: number) {
        let date = new Date(cardTimestamp * 1000);

        return date.getDate();
    }
}
