import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Authenticator } from './services/Authenticator';
import { UserService } from './services/user/UserService';

@Component({
    selector: 'application',
    templateUrl: './app.component.html'
})
export class AppComponent {

    public constructor(
        private router: Router,
        private authenticator: Authenticator,
        private userService: UserService
    ) {
        if (this.isAuthenticated()) {
            this.authenticator.requestInitializationData();
        }

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
}
