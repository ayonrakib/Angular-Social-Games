import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { CreatePollComponent } from 'src/app/components/features/create-poll/create-poll.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const isUserAdmin = await this.userService.amIAdmin();
    isUserAdmin ? (this.isAdmin = true) : (this.isAdmin = false);
  }
  isAdmin!: boolean;

  goToHome(): void {
    this.router.navigateByUrl('home');
  }

  showAnnouncements(): void {
    this.router.navigateByUrl('announcements');
  }

  showRules(): void {
    this.router.navigateByUrl('rules');
  }

  showFixture(): void {
    this.router.navigateByUrl('fixture');
  }

  showProfile(): void {
    this.router.navigateByUrl('profile');
  }

  createPoll(): void {
    this.router.navigateByUrl('create-poll');
  }

  createPlayer(): void {
    this.router.navigateByUrl('create-player');
  }

  logout(): void {
    console.log('came to logout!');
    if (this.authenticationService.deleteSession()) {
      this.router.navigateByUrl('');
    }
  }
}
