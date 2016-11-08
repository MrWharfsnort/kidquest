import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

    constructor(private router: Router) { }

    public user;

    public canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        if (this.user === undefined) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
