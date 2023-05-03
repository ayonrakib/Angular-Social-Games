import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/features/authentication/authentication.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { NavbarComponent } from './components/commons/navbar/navbar.component';
import { AnnouncementsComponent } from './components/features/announcements/announcements.component';
import { RulesComponent } from './components/features/rules/rules.component';
import { FixtureComponent } from './components/features/fixture/fixture.component';
import { PollComponent } from './components/features/poll/poll.component';
import { CreatePollComponent } from './components/features/create-poll/create-poll.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import {
  DateValueAccessor,
  DateValueAccessorModule,
  LocalDateValueAccessor,
  LocalDateValueAccessorModule,
} from 'angular-date-value-accessor';
import { ModalComponent } from './components/commons/modal/modal.component';
import { CreatePlayerComponent } from './components/features/create-player/create-player.component';
import { ProfileComponent } from './components/features/profile/profile.component';

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
    CreatePollComponent,
    ModalComponent,
    CreatePlayerComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    DateValueAccessor,
    DateValueAccessorModule,
    LocalDateValueAccessor,
    LocalDateValueAccessorModule,
    HttpClientModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
