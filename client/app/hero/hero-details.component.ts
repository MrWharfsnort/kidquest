import { Component, Input } from '@angular/core';

import { HeroCardComponent } from '../hero/hero-card.component';
import { QuestsListComponent } from '../quest/quest-list.component';
import { QuestService } from '../quest/quest.service';

@Component({
    selector: 'hero-details',
    templateUrl: './app/hero/hero-details.html'
})

export class HeroDetailsComponent {

    constructor(
        private questService: QuestService
    ) { }

    @Input()
        quest: any;

    ngOnInit() {
        this.questService.getAvailableQuests();
    }
}
