import { Injectable }                                                                from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store }                                                                     from '../store.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const isLoggedIn = !!this.store.getValue().user;
    console.log('IsLoggedInGuard', isLoggedIn);

    return isLoggedIn || this.router.createUrlTree(['/login']);
  }
}
