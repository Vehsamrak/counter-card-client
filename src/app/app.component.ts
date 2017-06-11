import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Authenticator } from './services/Authenticator';
import { UserService } from './services/user/UserService';
import { CardService } from './services/card/CardService';
import { Pluralizer } from './services/Pluralizer';

@Component({
    selector: 'application',
    templateUrl: './app.component.html'
})
export class AppComponent {

    public constructor(
        private router: Router,
        private authenticator: Authenticator,
        private userService: UserService,
        private cardService: CardService,
        private pluralizer: Pluralizer
    ) {
        this.userService.requestUser();
        this.cardService.requestLastCard();

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

    public getFlatNumber(): number {
        return this.userService.getFlatNumber();
    }

    public getUserName(): string {
        return this.userService.getUserName();
    }

    public pluralize(number, one, two, five): string {
        return this.pluralizer.pluralize(number, one, two, five);
    }
}
