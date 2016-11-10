import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { User } from '../user/user';


@Component({
    selector: 'sidebar',
    templateUrl: './app/dashboard/sidebar.html'
})
export class SidebarComponent {

    private user: User;

    ngOnInit() {
        this.user = this.authService.user;
        this.authService.getUserFromServer();
    }
    constructor(private authService: AuthService) { }
}
