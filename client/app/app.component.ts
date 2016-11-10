import { Component } from '@angular/core';

import { NavBarComponent } from './dashboard/navbar.component';


@Component({
    selector: 'kidquest',
    template: `
        <navbar></navbar>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {

}


// all of our page wrapper content goes here
// don't show navbar until logged in
