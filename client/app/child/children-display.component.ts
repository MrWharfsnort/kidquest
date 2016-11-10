import { Component } from '@angular/core';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'children-display',
    template: `
        <p>hello</p>
        <ul>
            <li *ngFor='let child of this.children'>{{ child.name.first }}</li>
        </ul>
    `
})
export class ChildrenDisplayComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    private children: [Object];

    private getChildren() {
        this.apiService.getObs('/user/children', this.authService.getJWT()).subscribe((res) => {
            // this.children = res.children;
            console.log('get children => ', res);
            for (let child of res.children) {
                this.children.push(child);
            }
        });
    }

    ngOnInit() {
        this.getChildren();
    }
}
