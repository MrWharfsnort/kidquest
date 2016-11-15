import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../user/user';
import { UserLoginComponent } from '../user/user-login.component';

@Component({
    selector: 'navbar',
    templateUrl: './app/dashboard/navbar.html'
})
export class NavBarComponent {

    private user: User;

    ngOnInit() {
        this.user = this.authService.user;
        this.authService.getUserFromServer();
    }

    constructor(private authService: AuthService) { }
}
