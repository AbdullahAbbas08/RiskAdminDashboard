import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  Token:string=localStorage.getItem('RiskAuthorization') as string

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLogin();
  }

  checkLogin(): boolean {
	  if (this.Token) {
		return true;
	  }else{
      this.router.navigate(["/login"]);
      return false;
    }
  
	  // Navigate to the login page with extras
	  // this.router.navigate(["/login"]);
	  // return false;
	}
}
