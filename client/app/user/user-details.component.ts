import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from './user';

import { } from './app/user/dashboard/navbar.component';

@Component({
    selector: 'user-details',
    templateUrl: './app/user/user-details.html'
})
export class UserDetailsComponent {

    private user: User;

    ngOnInit() {
        this.user = this.authService.user;
        this.authService.getUserFromServer();
    }

    constructor(private authService: AuthService) { }


}
