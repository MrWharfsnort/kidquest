import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './api.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user/user-details.component';
import { UserRegistrationComponent } from './user/user-registration.component';
import { UserLoginComponent } from './user/user-login.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        ApiService,
        UserService,
        AuthService
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        UserDetailsComponent,
        UserRegistrationComponent,
        UserLoginComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
