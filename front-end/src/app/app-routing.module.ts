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
import { ProfileComponent } from './components/features/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AuthenticationComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'announcements',
    component: AnnouncementsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'rules', component: RulesComponent, canActivate: [AuthGuard] },
  { path: 'fixture', component: FixtureComponent, canActivate: [AuthGuard] },
  {
    path: 'create-poll',
    component: CreatePollComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'create-player',
    component: CreatePlayerComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // {
  //   path: '**',
  //   component: HomeComponent,
  // },
  { path: '404', component: AuthenticationComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  HomeComponent,
  RegistrationComponent,
  AuthenticationComponent,
  AnnouncementsComponent,
  RulesComponent,
  FixtureComponent,
  CreatePollComponent,
  CreatePlayerComponent,
  ProfileComponent,
];
