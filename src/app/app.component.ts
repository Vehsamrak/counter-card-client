import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Authenticator } from "./services/Authenticator";

@Component({
    selector: 'application',
    templateUrl: './app.component.html'
})
export class AppComponent {
    private flatNumber: number;
    private ownerName: string;

    public constructor(
        private router: Router,
        private authenticator: Authenticator,
    ) {
        this.flatNumber = 10;
        this.ownerName = 'Грозный Иван Васильевич';

        router.events.subscribe((routerEvent) => {
            if (routerEvent instanceof NavigationEnd) {
                componentHandler.upgradeDom();
            }
        });
    }

    closeMenu() {
        let layout = document.querySelector('.mdl-layout');
        // close menu with MaterialLayout internal function
        (<any>layout).MaterialLayout.drawerToggleHandler_();
    }

    isAuthenticated(): boolean {
        return this.authenticator.isAuthenticated();
    }
}
