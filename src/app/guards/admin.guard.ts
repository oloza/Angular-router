import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

import{ AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // const token=this.tokenService.getToken();
        // if(!token){
        //   this.router.navigate(['/home']);
        //   return false;
        // }
        // return true;
        return this.authService.user$
        .pipe(
          map(user => {
            console.log('user?.role->',user?.role);
            if (user?.role === 'admin') {
              return true;
            }else{
              this.router.navigate(['/home']);
              return false;
            }
            
          })
        );
      }
  
}
