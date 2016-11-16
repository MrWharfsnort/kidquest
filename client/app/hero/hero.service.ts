import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { Hero } from './hero';

@Injectable()
    export class HeroService {

        constructor(
            private authService: AuthService,
            private apiService: ApiService
        ) { }

        public hero: Hero = {
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

        public getHero() {
            this.apiService.getObs('/hero', this.authService.getHeroJWT()).subscribe((res) => {
                this.hero = res.data;
            });
        }
    }

