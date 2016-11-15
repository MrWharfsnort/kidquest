import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
    selector: 'user-login',
    templateUrl: './app/user/user-login.html'

})
export class UserLoginComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    private error: string = '';

    private userLogin = {
        email: '',
        password: ''
    };

    private submitLogin() {
        if (this.userLogin.email.length === 0) {
            this.error = 'username cannot be empty';
        } else {
            this.authService.userLogin(this.userLogin.email, this.userLogin.password).subscribe((res) => {
                console.log('user auth', res);
                if (res.status === 'success') {
                    console.log('asdfasdfas');
                    this.router.navigate(['/user']);
                } else {
                    console.log('failboat');
                }
            });
        }
    }
}
