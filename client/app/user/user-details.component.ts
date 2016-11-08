import { Component } from '@angular/core';

import { UserService } from './user.service';
import { User } from './user';

@Component({
    selector: 'user-details',
    template: `
        <h1 *ngIf='user'>Welcome {{ user.name }}</h1>
        <p>{{ user.email }}</p>
        <p>{{ user.type }}</p>
    `
})
export class UserDetailsComponent {

    private user: User;

    ngOnInit() {
        this.user = this.userService.user;
        this.userService.getUser();
    }

    constructor(private userService: UserService) { }


}
