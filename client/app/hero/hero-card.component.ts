import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'hero-card',
    templateUrl: './app/hero/hero-card.html'
})
export class HeroCardComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    hero: any;

    private getHero() {
        this.apiService.getObs('/hero', this.authService.getHeroJWT()).subscribe((res) => {
            this.hero = res.data;
        });
    }

    ngOnInit() {
        this.getHero();
    }
}
