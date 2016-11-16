import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { QuestService } from './quest.service';

import { Quest } from './quest';

@Component({
    selector: 'quest-card',
    templateUrl: './app/quest/quest-card.html'
})

export class QuestCardComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private questService: QuestService
    ) { }

    @Input()
        quest: Quest;

    @Output()
        delete = new EventEmitter();

    @Output()
        accept = new EventEmitter();

}
