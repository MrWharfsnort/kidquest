import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

import { Child } from './child';

@Component({
    selector: 'child-card',
    templateUrl: './app/child/child-card.html'
})
export class ChildCardComponent {

    constructor(
        private apiService: ApiService,
        private authService: AuthService
    ) { }

    @Input()
        child: Child;

    @Output()
        remove = new EventEmitter();
}
