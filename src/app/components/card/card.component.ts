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
    private apiUrl = environment.apiUrl + '/api/card';
    private numericPattern: string = '[0-9]+([\.,])?([0-9]+)?';
    private submitted: boolean = false;
    private submitButtonEnabled: boolean = true;
    public buttonText: string = 'Отправить показания счетчиков';

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
        let secondDate = new Date(today.getFullYear(), today.getMonth(), 20);

        if (today.getDay() > 20) {
            return 0;
        }

        return Math.round(Math.abs((today.getTime() - secondDate.getTime()) / (oneDay)));
    }

    public submitForm(form: any): void {
        if (this.formIsValid(form)) {
            this.submitButtonEnabled = false;
            this.buttonText = 'Показания отправлены';

            this.http.post(this.apiUrl, form).subscribe(
                (data) => console.log(data),
                (error) => console.log(error)
            );
        }

        this.submitted = true;
    }

    private formIsValid(form: any): boolean {
        return form.waterHot && form.waterCold && form.electricityDay && form.electricityNight;
    }
}
