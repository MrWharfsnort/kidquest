import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';

@Component({
    selector: 'register-user',
    template: `
        Name: <input [(ngModel)]='user.name' type='text'>
        Email Address: <input [(ngModel)]='user.email' type='text'>
        Password: <input [(ngModel)]='user.password' type='password'>
        <button (click)='addUser()'>submit</button>
        <p *ngIf='error'>{{ error }}</p>
    `
})
export class UserRegistrationComponent {

    private user: User = {
        name: '',
        email: '',
        password: '',
        _id: ''
    };

    private error: string = '';

    constructor (
        private router: Router
    ) { }

    addUser() {
    //     console.log('lies');
    //     this.userService.addUser(this.user).subscribe((res) => {
    //         if (res.status === 'registered') {
    //             this.router.navigate(['/user', res.user._id]);
    //         } else {
    //             this.error = res.message;
    //         }
    //     });
    }
 }
