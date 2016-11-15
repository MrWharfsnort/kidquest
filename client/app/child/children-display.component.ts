import { Component } from '@angular/core';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'children-display',
    templateUrl: './app/child/children-display.html'
})
export class ChildrenDisplayComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    children: Array<any>;

    private getChildren() {
        this.apiService.getObs('/user/children', this.authService.getJWT()).subscribe((res) => {
            this.children = [];

            for (let child of res.children) {
                this.children.push(child);
            }
        });
    }

    private childId: string = '';

    private removeChild(hero) {
        // console.log('children array => ', this.children);
        // console.log('remove => ', hero);
        this.apiService.postObs('/child/delete',
            { _id: hero._id },
            this.authService.getJWT()).subscribe((res) => {
                if (res.status === 'success') {
                    this.getChildren();
                } else {
                    console.log('error', res.message);
                }
            }
        );
    }

    ngOnInit() {
        this.getChildren();
    }
}
