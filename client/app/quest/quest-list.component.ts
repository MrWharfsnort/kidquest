import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
    selector: 'quests-list',
    templateUrl: './app/quest/quest-list.html'
})

export class QuestsListComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    quests: Array<any>;

    private getQuests() {
        this.apiService.getObs('/user/quests', this.authService.getJWT()).subscribe((res) => {
            this.quests = [];

            console.log('@getQuests => ', res);

            for (let quest of res.quests) {
                this.quests.push(quest);
            }
        });
    }

    ngOnInit() {
        this.getQuests();
    }
}
