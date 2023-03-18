import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { RulesComponent } from './rules/rules.component';
import { FixtureComponent } from './fixture/fixture.component';
import { CreatePollComponent } from './create-poll/create-poll.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'home', component: HomeComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'fixture', component: FixtureComponent },
  { path: 'create-poll', component: CreatePollComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, RegistrationComponent, AuthenticationComponent,
                                  AnnouncementsComponent, RulesComponent, FixtureComponent,
                                  CreatePollComponent
                                ];