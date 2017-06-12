import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticator } from '../../services/Authenticator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private invalidLoginAndPassword: boolean = false;
    private submitted: boolean = false;
    private loading: boolean = false;
    private model: any = {};

    constructor(
        private router: Router,
        private authenticator: Authenticator
    ) {
    }

    ngOnInit() {
        this.authenticator.logout();
    }

    submitForm(form: any) {
        this.submitted = true;

        if (this.formIsValid(form)) {
            this.loading = true;

            this.authenticator.login(form.login, form.password)
                .subscribe(
                    data => {
                        this.authenticator.requestInitializationData();
                        this.router.navigate(['/']);
                    },
                    error => {
                        console.log(error);
                        this.loading = false;
                        this.invalidLoginAndPassword = true;
                    }
                );
        }
    }

    private formIsValid(form): boolean {
        return form.login && form.password;
    }
}
