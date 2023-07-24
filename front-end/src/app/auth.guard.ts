import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('route: ', route);
    console.log('state: ', state);
    // return this.userService.isLoggedIn();
    const isLoggedIn = this.userService.isLoggedIn();
    const isUserLoggedIn = isLoggedIn.then((response) => {
      if (response) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false;
      }
    });
    return isUserLoggedIn;
  }
}
