import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user/user-details.component';
import { UserRegistrationComponent } from './user/user-registration.component';
import { UserLoginComponent } from './dashboard/user-login.component';
import { AuthService } from './auth.service';

import { ChildAddComponent } from './child/child-add.component';
import { ChildDisplayComponent } from './child/child-display.component';
import { ChildrenDisplayComponent } from './child/children-display.component';

import { QuestAddComponent } from './quest/add-quest.component';

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
            { path: 'quests'},
            { path: 'quest'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


// UserDetailComponent
// UserLoginComponent
// UserRegistrationComponent
// HeroDetailsComponent
// HeroAddComponent
// ChildViewComponent
// ChildRegistrationComponent
// QuestDetailsComponent
// QuestCardComponent
// QuestAddComponent
