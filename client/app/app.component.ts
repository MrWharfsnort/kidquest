import { Component } from '@angular/core';


@Component({
    selector: 'kidquest',
    template: `
        <h1>KidQuest</h1>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {

}


// all of our page wrapper content goes here
// don't show navbar until logged in
