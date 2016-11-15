import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NavBarComponent } from '../dashboard/navbar.component';
import { ChildLoginComponent } from '../child/child-login.component';
import { UserLoginComponent } from '../user/user-login.component';

@Component({
    selector: 'home',
    templateUrl: './app/home/home.html'
})
export class HomeComponent { }
