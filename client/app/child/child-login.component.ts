import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'child-login',
    templateUrl: './app/child/child-login.html'
})
export class ChildLoginComponent {

    constructor(
        private router: Router,
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    private heroLogin = {
        name: '',
        password: ''
    };

    private submitLogin() {
        this.authService.heroLogin(this.heroLogin.name, this.heroLogin.password).subscribe((res) => {
            if (res.status === 'success') {
                this.authService.hero = res.hero;
                this.router.navigate(['/hero']);
            } else {
                console.log('@child-login error => ', res.message);
            }
        });
    }
}
