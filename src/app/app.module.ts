import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { NavbarComponent } from './commons/navbar/navbar.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RulesComponent } from './rules/rules.component';
import { FixtureComponent } from './fixture/fixture.component';
import { PollComponent } from './poll/poll.component';
import { CreatePollComponent } from './create-poll/create-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    routingComponents,
    NavbarComponent,
    AnnouncementsComponent,
    RulesComponent,
    FixtureComponent,
    PollComponent,
    CreatePollComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
