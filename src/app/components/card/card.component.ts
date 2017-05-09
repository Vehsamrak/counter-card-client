import { Component } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent {
    private numericPattern = '-?[0-9]*(\.[0-9]+)?';

    getCurrentMonth(): string {
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

    getDaysToDeadline(): number {
        return 0;
    }
}
