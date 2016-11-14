import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

import { Router,
    CanActivate, CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService implements CanActivate {

    // User object for storing the current active user
    // undefined if not logged in
    public user: any;

    // Whether we've already received the user data from the server,
    // or if we're still waiting for that.
    private received: boolean = false;

    // Constructor, injecting router and apiService
    constructor(private router: Router,
        private apiService: ApiService
    ) { }

    // Get the JWT from one of two locations:
    // stored in this.user
    // stored in localstorage
    public getJWT() {
        let jwt = '';
        if (this.user && this.user.jwt) {
            jwt = this.user.jwt;
        } else if (localStorage.getItem('jwt')) {
            jwt = localStorage.getItem('jwt');
        }
        return jwt;
    }

    // No need to touch the server. Just lose our local data
    // and we're already logged out.
    public logout() {
        localStorage.removeItem('jwt');
        this.user = undefined;
        this.router.navigate(['/']);
    }

    // Get the user data from the server, using the JWT
    public getUserFromServer() {
        // GET req with JWT
        return this.apiService.getObs('/user', this.getJWT()).do((res) => {
            // On the way through, copy the user into our local var
            if (res.status === 'success') {
                this.user = res.user;
                localStorage.setItem('jwt', res.user.jwt);
            }
            this.received = true;
        },
        (err) => {
            // 401 not authorized.
            this.received = true;
        });
    }

    // Login (returns an observable) using a username and string.
    // Stores the user in authService.user
    public userLogin(email: string, password: string): Observable<any> {
        return this.apiService.postObs('/user/login', {
            email: email,
            password: password
        }).do(
            (res) => {
                if (res.status === 'success') {
                    this.user = res.user;
                    localStorage.setItem('jwt', res.user.jwt);
                }
                this.received = true;
            },
            (err) => {
                console.log('error on login: ', err);
            }
        );
    }

    // Magic
    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            if (this.received) {
                if (this.user) {
                    observer.next(true);
                    observer.complete();
                    return;
                } else {
                    observer.next(false);
                    this.router.navigate(['/']);
                    observer.complete();
                    return;
                }
            } else {
                this.getUserFromServer().subscribe((res) => {
                    observer.next(res.status === 'success');
                    observer.complete();
                }, (err) => {
                    observer.next(false);
                    this.router.navigate(['/']);
                    observer.complete();
                });
                return;
            }
        });
    }
}
