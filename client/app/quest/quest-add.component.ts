import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { QuestService } from './quest.service';

// import { Quest } from './quest';

@Component({
    selector: 'add-quest',
    templateUrl: './app/quest/quest-add.html'
})
export class QuestAddComponent {

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router,
        private questService: QuestService
    ) { }
}
