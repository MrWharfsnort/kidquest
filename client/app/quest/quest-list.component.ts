import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

import { QuestCardComponent } from '../quest/quest-card.component';

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

            for (let quest of res.quests) {
                this.quests.push(quest);
            }

            this.quests.reverse();
        });
    }

    ngOnInit() {
        this.getQuests();
    }

}
