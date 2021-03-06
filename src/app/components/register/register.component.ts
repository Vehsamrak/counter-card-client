import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticator } from '../../services/Authenticator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    public sameIpRegistration: boolean = false;
    private model: any = {};
    private loading = false;
    private emailPattern: string = '.+@.+\\..+';
    private submitted: boolean = false;
    private nonUniqueEmailOrFlatNumber: boolean = false;

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
                        this.authenticator.requestInitializationData();
                        this.router.navigate(['/']);
                    },
                    error => {
                        this.loading = false;

                        if (error.status === 403) {
                            this.sameIpRegistration = true;
                            this.nonUniqueEmailOrFlatNumber = false;
                        } else {
                            this.nonUniqueEmailOrFlatNumber = true;
                        }
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
