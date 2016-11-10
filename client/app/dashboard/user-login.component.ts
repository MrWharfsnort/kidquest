import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
    selector: 'user-login',
    templateUrl: './app/dashboard/user-login.html'

})
export class UserLoginComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        // private userService: UserService
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
            this.authService.login(this.userLogin.email, this.userLogin.password).subscribe((res) => {
                if (res.status === 'success') {
                    this.authService.user = res.user;
                    this.router.navigate(['/user', res.user._id]);
                } else {
                    console.log('failboat');
                }
            });
        }
    }
}
