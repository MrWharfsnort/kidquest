import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

import { Quest } from './quest';

@Component({
    selector: 'add-quest',
    templateUrl: './app/quest/quest-add.html'
})
export class QuestAddComponent {

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router
    ) { }

    private message: string;

    private newQuest: Quest = {
        title: '',
        description: ''
    };

    private createQuest() {
        console.log('new quest: ', this.newQuest);
        this.apiService.postObs('/quest/add', this.newQuest, this.authService.getJWT()).subscribe((res) => {
            this.message = res.message;

            if (res.status === 'success') {
                this.newQuest.title = '';
                this.newQuest.description = '';
                this.router.navigate(['/user/quests']);
            } else {
                console.log('Error', this.message);
            }

        });

    }
}
