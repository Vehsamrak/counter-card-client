import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authenticator } from '../../services/Authenticator';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticator: Authenticator
    ) {
    }

    ngOnInit() {
        this.authenticator.logout();
    }

    login() {
        this.loading = true;
        this.authenticator.login(this.model.email, this.model.password)
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
