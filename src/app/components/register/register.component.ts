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
    private submitted: boolean = false;

    constructor(
        private router: Router,
        private authenticator: Authenticator
    ) {
    }

    submitForm(form: any) {
        this.submitted = true;

        if (this.formIsValid(form)) {
            this.loading = true;

            this.authenticator.register(
                this.model.email,
                this.model.password,
                this.model.username,
                this.model.flatNumber
            )
                .subscribe(
                    data => {
                        this.router.navigate(['/']);
                    },
                    error => {
                        console.log(error);
                        this.loading = false;
                    }
                );
        }
    }

    private formIsValid(form): boolean {
        return form.email && form.password && form.username && form.flatNumber && this.emailIsValid();
    }

    emailIsValid(): boolean {
        let regexp = new RegExp(this.emailPattern);

        return regexp.test(this.model.email);
    }
}
