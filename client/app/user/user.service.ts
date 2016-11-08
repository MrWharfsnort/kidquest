import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';

import { User } from './user';

@Injectable()
export class UserService {
    constructor( private apiService: ApiService) {
        this.getUser();
    }

    public user: User;

    addUser(newUser: Object) {
        return this.apiService.postObs('/user/register', newUser).do((res) => {
            if (res.status === 'registered') {
                this.user = res.user;
            }
        });
    }

    authUser(userLogin: Object) {
        return this.apiService.postObs('/user/login', userLogin).do((res) => {
            if (res.status === 'authorized') {
                this.user = res.authUser;
            } else {
                console.log('failboat');
            }
        });
    }

    getUser() {
        this.apiService.getObs('/user').subscribe((res) => {
            console.log('userservice', res);
            if (res.status === 'success') {
                this.user = res.user;
            }
        });
    }

}
