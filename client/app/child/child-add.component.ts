import { Component } from '@angular/core';
import { Child } from './child';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
    selector: 'add-child',
    templateUrl: './app/child/child-add.html'
})
export class ChildAddComponent {

    constructor(
        private authService: AuthService,
        private apiService: ApiService
        ) { }

    public message: string = '';
    private confirmPass: string;

    private newChild: Child = {
        name: {
            first: '',
            last: ''
        },
        password: '',
        parent: this.authService.user._id
    };

    private addChild() {
        console.log(this.newChild);
        this.apiService.postObs('/user/child', this.newChild, this.authService.getJWT()).subscribe((res) => {
            if (res.status === 'success') {
                this.message = res.message;
                this.newChild.name.first = '';
                this.newChild.name.last = '';
                this.newChild.password = '';
                this.confirmPass = '';
            } else {
                console.log('inconceivable - no child added.');
            }
        });
    }
}

// todo --
// when adding child - set message div to 'child added' and display to show
// set interval to 2 seconds and hide again
