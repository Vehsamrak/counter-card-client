import { Component } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { HttpClient } from '../../services/http/HttpClient';

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
    private electricityDay: string = '';
    private electricityNight: string = '';

    constructor(private http: HttpClient) {
    }

    public getCurrentMonth(): string {
        let date = new Date();
        let month = [];
        month[0] = 'январь';
        month[1] = 'февраль';
        month[2] = 'март';
        month[3] = 'апрель';
        month[4] = 'май';
        month[5] = 'июнь';
        month[6] = 'июль';
        month[7] = 'август';
        month[8] = 'сентябрь';
        month[9] = 'октябрь';
        month[10] = 'ноябрь';
        month[11] = 'декабрь';

        return month[date.getMonth()];
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

    private formIsValid(form: any): boolean {
        return form.waterHot && form.waterCold && form.electricityDay && form.electricityNight;
    }
}
