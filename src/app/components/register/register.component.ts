import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticator } from '../../services/Authenticator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticator: Authenticator
    ) {
    }

    register() {
        this.loading = true;
        this.authenticator.register(this.model)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.loading = false;
                }
            );
    }
}
