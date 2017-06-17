import { Component } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { HttpClient } from '../../services/http/HttpClient';
import { CardService } from '../../services/card/CardService';
import { Pluralizer } from '../../services/Pluralizer';
import { DateProcessor } from "../../services/DateProcessor";
import { Authenticator } from "../../services/Authenticator";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {
    public numericPattern: string = '[0-9]+([\.,])?([0-9]+)?';
    public buttonText: string = 'Отправить показания счетчиков';
    public buttonStyle = {};
    public buttonError = false;

    private apiUrl = environment.apiUrl + '/api/card';
    private submitted: boolean = false;
    private submitButtonEnabled: boolean = true;
    private errorButtonStyle = {
        background: 'rgb(220, 41, 41)',
        color: 'white',
        fontWeight: 600,
    };
    private waterHot: string = '';
    private waterCold: string = '';

    constructor(
        private http: HttpClient,
        public pluralizer: Pluralizer,
        public cardService: CardService,
        private dateProcessor: DateProcessor,
        private authenticator: Authenticator
    ) {
    }

    public getCurrentMonth(): string {
        return this.dateProcessor.getCurrentMonth();
    }

    public getDaysToDeadline(): number {
        let oneDay = 24 * 60 * 60 * 1000;
        let today = new Date();
        let secondDate = new Date(today.getFullYear(), today.getMonth(), 21);

        if (today.getDay() > 20) {
            return 0;
        }

        return Math.round(Math.abs((today.getTime() - secondDate.getTime()) / (oneDay)));
    }

    public submitForm(form: any): void {
        if (this.formIsValid(form)) {
            this.submitButtonEnabled = false;

            this.http.post(this.apiUrl, form).subscribe(
                (data) => {
                    this.buttonText = 'Показания отправлены';
                    this.authenticator.requestInitializationData();
                },
                (error) => {
                    this.buttonError = true;
                    this.buttonText = 'Показания не отправлены';
                    this.buttonStyle = this.errorButtonStyle;
                    return console.log(error);
                }
            );
        }

        this.submitted = true;
    }

    public cardWasSentInThisMonth(): boolean {
        return this.cardService.cardWasSentInThisMonth();
    }

    private formIsValid(form: any): boolean {
        return form.waterHot && form.waterCold;
    }
}
