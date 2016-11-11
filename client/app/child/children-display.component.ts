import { Component } from '@angular/core';

// import { User } from '../user/user';

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

    public children: Array<any>;
    // private user: User;

    private getChildren() {
        this.apiService.getObs('/user/children', this.authService.getJWT()).subscribe((res) => {
            this.children = [];

            for (let child of res.children) {
                this.children.push(child);
            }
        });
    }

    ngOnInit() {
        // this.user = this.authService.user;
        // this.authService.getUserFromServer();
        this.getChildren();
    }
}
