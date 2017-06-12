import { Injectable } from '@angular/core';

@Injectable()
export class DateProcessor {

    public getCurrentMonth(): string {
        return this.getMonthName[new Date().getMonth()];
    }

    public getMonthNames(): object {
        const months = [];
        months[0] = 'январь';
        months[1] = 'февраль';
        months[2] = 'март';
        months[3] = 'апрель';
        months[4] = 'май';
        months[5] = 'июнь';
        months[6] = 'июль';
        months[7] = 'август';
        months[8] = 'сентябрь';
        months[9] = 'октябрь';
        months[10] = 'ноябрь';
        months[11] = 'декабрь';

        return months;
    }

    public getMonthName(month: number): string {
        const months = this.getMonthNames();

        return months[month];
    }
}
