import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user/user-details.component';
import { UserRegistrationComponent } from './user/user-registration.component';
import { UserLoginComponent } from './user/user-login.component';
import { AuthService } from './auth.service';

import { ChildAddComponent } from './child/child-add.component';
import { ChildCardComponent } from './child/child-card.component';
import { ChildrenDisplayComponent } from './child/children-display.component';
import { ChildLoginComponent } from './child/child-login.component';

import { QuestAddComponent } from './quest/quest-add.component';
import { QuestsListComponent } from './quest/quest-list.component';

import { HeroDetailsComponent } from './hero/hero-details.component';

import { AnimationTestComponent } from './animation/animation-test.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'register',
        component: UserRegistrationComponent
    },
    {
        path: 'user',
        component: UserDetailsComponent,
        canActivate: [AuthService],
        children: [
            { path: '', component: ChildrenDisplayComponent}, // TODO - default is children
            { path: 'children', component: ChildrenDisplayComponent},
            { path: 'child/add', component: ChildAddComponent},
            { path: 'quests/add', component: QuestAddComponent},
            { path: 'quests', component: QuestsListComponent}
        ]
    },
    {
        path: 'hero',
        canActivate: [AuthService],
        component: HeroDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
