import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'register-user',
    templateUrl: './app/user/user-registration.html'
})
export class UserRegistrationComponent {

    constructor (
        private router: Router,
        private authService: AuthService,
        private apiService: ApiService
    ) { }

    private user: User = {
        name: '',
        email: '',
        password: '',
        _id: ''
    };

    private error: string = '';


    addUser() {
        this.apiService.postObs('/user/register', this.user, this.authService.getJWT()).subscribe((res) => {
            if (res.status === 'registered') {
                this.authService.user = res.user;
                this.router.navigate(['/user']);
            } else {
                this.error = res.message;
            }
        });
    }
 }
