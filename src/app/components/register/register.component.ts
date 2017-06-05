import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticator } from '../../services/Authenticator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    private model: any = {};
    private loading = false;
    private emailPattern: string = '.+@.+\..+';

    constructor(
        private router: Router,
        private authenticator: Authenticator
    ) {
    }

    register() {
        this.loading = true;
        this.authenticator.register(
            this.model.email,
            this.model.password,
            this.model.name,
            this.model.flatNumber
        )
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
