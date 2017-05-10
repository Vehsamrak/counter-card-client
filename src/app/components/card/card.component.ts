import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {
    private apiUrl = 'http://echo.jsontest.com/key/value/result/ok'; //TODO[petr]: change this to real API url
    private numericPattern: string = '\\d*';
    private submitted: boolean = false;
    private submitButtonEnabled: boolean = true;
    public buttonText: string = 'Отправить показания счетчиков';

    private hotWater: string = '';
    private coldWater: string = '';
    private dayElectricity: string = '';
    private nightElectricity: string = '';

    constructor(private http: Http) {
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
        return 0;
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
        return form.hotWater && form.coldWater && form.dayElectricity && form.nightElectricity;
    }
}
