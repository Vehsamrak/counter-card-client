import { Injectable } from '@angular/core';

@Injectable()
export class Pluralizer {

    public pluralize(number, one, two, five): string {
        let n = Math.abs(number);

        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }

        n %= 10;
        if (n === 1) {
            return one;
        }

        if (n >= 2 && n <= 4) {
            return two;
        }

        return five;
    }
}
