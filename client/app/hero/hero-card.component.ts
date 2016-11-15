import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

import { Hero } from './hero';

@Component({
    selector: 'hero-card',
    templateUrl: './app/hero/hero-card.html'
})
export class HeroCardComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    hero: Hero = {
        name: '',
        parent: '',
        activeQuests: [],
        hero: {
            name: '',
            inventory: [],
            credits: 0,
            xp: 0,
            strength: 0,
            wisdom: 0,
            kindness: 0,
            courage: 0,
            responsibility: 0,
        }
    };

    private getHero() {
        this.apiService.getObs('/hero', this.authService.getHeroJWT()).subscribe((res) => {
            this.hero = res.data;
        });
    }

    ngOnInit() {
        this.getHero();
    }
}
