import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

import { Quest } from './quest';

@Injectable()
export class QuestService {

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private router: Router
    ) { }

    private quests: Array<any>;

    private message: string = '';

    private newQuest: Quest = {
        title: '',
        description: '',
        xp: 0,
        credits: 0
    };

    public getQuests() {
        this.apiService.getObs('/user/quests', this.authService.getJWT()).subscribe((res) => {
            this.quests = [];

            for (let quest of res.quests) {
                this.quests.push(quest);
            }

            this.quests.reverse();
        });
    }

    public deleteQuest(quest) {
        console.log('delete quest: ', quest._id);
        this.apiService.postObs('/quest/delete', { _id: quest._id }, this.authService.getJWT()).subscribe((res) => {
            if (res.status === 'success') {
                console.log(res.message);
                this.getQuests();
            } else {
                console.log(res.message);
            }
        });
    }

    public acceptQuest(quest) {
        console.log('quest service - acceptQuest');
        this.apiService.postObs('/hero/quest/accept', { _id: quest._id }, this.authService.getJWT()).subscribe((res) => {
            if (res.status === 'success') {
                console.log(res.message);
                this.getAvailableQuests();
            } else {
                console.log(res.message);
            }
        });
    }

    public completeQuest(quest) {
        console.log('Completing quest...');
        this.apiService.postObs('/hero/quest/complete', { _id: quest._id }, this.authService.getJWT()).subscribe((res) => {
           if (res.status === 'success') {
               this.message = res.message;
               this.getAvailableQuests();
           } else {
               console.log('error completing quest: ', res.message);
           }

        });
    }


    public createQuest() {
        console.log('new quest: ', this.newQuest);
        this.apiService.postObs('/quest/add', this.newQuest, this.authService.getJWT()).subscribe((res) => {
            this.message = res.message;

            if (res.status === 'success') {
                this.newQuest.title = '';
                this.newQuest.description = '';
                this.newQuest.xp = 0;
                this.newQuest.credits = 0;
                this.router.navigate(['/user/quests']);
            } else {
                console.log('Error', this.message);
            }

        });
    }

    public getAvailableQuests() {
        console.log('getting hero quests...');
        this.apiService.getObs('/hero/quests/available', this.authService.getJWT()).subscribe((res) => {
            console.log('available quests: ', this.quests);
            console.log('quests from server', res.quests);
            console.log('response from server: ', res);
            this.quests = [];

            for (let quest of res.quests) {
                this.quests.push(quest);
            }

            this.quests.reverse();
        });
    }
}
