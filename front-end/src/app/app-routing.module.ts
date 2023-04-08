import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/features/home/home.component';
import { RegistrationComponent } from './components/features/registration/registration.component';
import { AuthenticationComponent } from './components/features/authentication/authentication.component';
import { AnnouncementsComponent } from './components/features/announcements/announcements.component';
import { RulesComponent } from './components/features/rules/rules.component';
import { FixtureComponent } from './components/features/fixture/fixture.component';
import { CreatePollComponent } from './components/features/create-poll/create-poll.component';
import { CreatePlayerComponent } from './components/features/create-player/create-player.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'home', component: HomeComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'fixture', component: FixtureComponent },
  { path: 'create-poll', component: CreatePollComponent },
  { path: 'create-player', component: CreatePlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, RegistrationComponent, AuthenticationComponent,
                                  AnnouncementsComponent, RulesComponent, FixtureComponent,
                                  CreatePollComponent, CreatePlayerComponent
                                ];