import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';


//  home
import { HomeComponent } from './home/home.component';

//  user
import { UserDetailsComponent } from './user/user-details.component';
import { UserRegistrationComponent } from './user/user-registration.component';
import { UserLoginComponent } from './dashboard/user-login.component';

//  dashboard
import { NavBarComponent } from './dashboard/navbar.component';
import { SidebarComponent } from './dashboard/sidebar.component';

// child
import { ChildAddComponent } from './child/child-add.component';
import { ChildDisplayComponent } from './child/child-display.component';
import { ChildrenDisplayComponent } from './child/children-display.component';

//  quest
import { QuestAddComponent } from './quest/quest-add.component';
import { QuestsListComponent } from './quest/quest-list.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
    ],
    providers: [
        ApiService,
        AuthService
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        UserDetailsComponent, UserRegistrationComponent, UserLoginComponent,
        NavBarComponent, SidebarComponent,
        ChildAddComponent, ChildDisplayComponent, ChildrenDisplayComponent,
        QuestAddComponent, QuestsListComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
