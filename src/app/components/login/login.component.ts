import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticator } from '../../services/Authenticator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private invalidLoginAndPassword = false;
    private submitted: boolean = false;
    private submitButtonEnabled: boolean = true;
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
            this.submitButtonEnabled = false;

            this.authenticator.login(form.email, form.password)
                .subscribe(
                    data => {
                        this.router.navigate(['/']);
                    },
                    error => {
                        console.log(error);
                        this.invalidLoginAndPassword = true;
                    }
                );
        }
    }

    private formIsValid(form): boolean {
        return form.email && form.password;
    }
}
