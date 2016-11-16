import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { HeroService } from './hero.service';

// import { Hero } from './hero';

@Component({
    selector: 'hero-card',
    templateUrl: './app/hero/hero-card.html'
})
export class HeroCardComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private heroService: HeroService
    ) { }

    ngOnInit() {
        this.heroService.getHero();
    }
}
