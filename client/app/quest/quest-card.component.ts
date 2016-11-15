import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

import { Quest } from './quest';

@Component({
    selector: 'quest-card',
    templateUrl: './app/quest/quest-card.html'
})

export class QuestCardComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    @Input()
        quest: Quest;
}
