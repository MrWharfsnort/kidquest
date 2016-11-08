import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user/user-details.component';
import { UserRegistrationComponent } from './user/user-registration.component';
import { UserLoginComponent } from './user/user-login.component';
import { AuthService } from './auth.service';

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
        path: 'login',
        component: UserLoginComponent
    },
    {
        path: 'user/:id',
        component: UserDetailsComponent,
        canActivate: [AuthService]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }


//     {
//         path: '',
//         component: HeroViewComponent
//     },
//     {
//         path: 'league',
//         component: LeagueViewComponent,
//         canActivate: [AuthService]
//     },
//     {
//         path: 'hero/:id',
//         component: HeroDetailComponent
//     }

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
