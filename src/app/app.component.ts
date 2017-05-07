import { Component } from '@angular/core';

@Component({
    selector: 'application',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private flatNumber: number;
    private ownerName: string;

    public constructor() {
        this.flatNumber = 10;
        this.ownerName = 'Грозный Иван Васильевич'
    }

    closeMenu() {
        let layout = document.querySelector('.mdl-layout');
        // close menu with MaterialLayout interlan function
        (<any>layout).MaterialLayout.drawerToggleHandler_();
    }
}
