import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { UserService } from './user.service';

@Component({
    selector: 'user-login',
    template: `
        {{ userService.user | json }}
        email: <input type='text' [(ngModel)]='userLogin.email'><br />
        password: <input type='password' [(ngModel)]='userLogin.password'><br />
        <button (click)=submitLogin()>log in</button>
        <p class='errMsg' *ngIf='error'>{{ error }}</p>
    `

})
export class UserLoginComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        private userService: UserService
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
            this.userService.authUser(this.userLogin).subscribe((res) => {
                if (res.status === 'authorized') {
                    this.authService.user = res.authUser;
                    this.router.navigate(['/user', res.authUser._id]);
                } else {
                    console.log('failboat');
                }
            });
        }
    }
}
