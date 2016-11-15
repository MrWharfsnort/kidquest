import { Component } from '@angular/core';

import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { QuestService } from './quest.service';

import { QuestCardComponent } from '../quest/quest-card.component';

@Component({
    selector: 'quests-list',
    templateUrl: './app/quest/quest-list.html'
})

export class QuestsListComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private questService: QuestService
    ) { }

    ngOnInit() {
        this.questService.getQuests();
    }

}
