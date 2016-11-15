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
    public hero: any;
    public type: string;

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
    public logout(navigate: boolean = true) {
        localStorage.removeItem('jwt');
        this.user = undefined;
        if (navigate) {
            this.router.navigate(['/']);
        }
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
                    this.heroLogout(false);
                    localStorage.setItem('jwt', res.user.jwt);
                }
                this.received = true;
            },
            (err) => {
                console.log('error on login: ', err);
            }
        );
    }

    public getHeroJWT() {
        let jwt = '';

        if (this.hero && this.hero.jwt) {
            jwt = this.hero.jwt;
        } else if (localStorage.getItem('jwt')) {
            jwt = localStorage.getItem('jwt');
        }

        return jwt;
    }

    public getHeroFromServer() {
        // GET req with JWT
        return this.apiService.getObs('/hero', this.getHeroJWT()).do((res) => {
            console.log('get hero bro');
            if (res.status === 'success') {
                this.hero = res.data;
                localStorage.setItem('jwt', res.data.jwt);
            }
            this.received = true;
        },
        (err) => {
            // 401 not authorized.
            this.received = true;
        });
    }

    public heroLogout(navigate: boolean = true) {
        localStorage.removeItem('jwt');
        this.hero = undefined;
        if (navigate) {
            this.router.navigate(['/']);
        }
    }

    public heroLogin(name: string, password: string): Observable<any> {
        return this.apiService.postObs('/hero/login', {
            name: name,
            password: password
        }).do((res) => {
            if (res.status === 'success') {
                this.hero = res.hero;
                this.logout(false);
                localStorage.setItem('jwt', res.hero.jwt);
            }

            this.received = true;
        },
        (err) => {
            console.log('error logging in: ', err);
        });
    }

    // Magic
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            if (this.received) {
                if (this.hero || this.user) {
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
                // if (!this.user && !this.hero) {
                //     this.getUserFromServer().subscribe((res) => {
                //         observer.next(res.status === 'success');
                //         observer.complete();
                //     }, (err) => {
                //         observer.next(false);
                //         this.router.navigate(['/']);
                //         observer.complete();
                //     });
                //     return;
                    this.getHeroFromServer().subscribe((res) => {
                    observer.next(res.status === 'success');
                    observer.complete();
                }, (err) => {

                    console.log('auth obs', err);
                    observer.next(false);
                    this.router.navigate(['/']);
                    observer.complete();
                });
                return;
            }
        });
    }
}
