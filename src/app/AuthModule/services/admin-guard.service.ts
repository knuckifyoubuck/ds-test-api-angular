import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState, selectAuthState } from "../../store/app.states";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  private getState: Observable<any>;

  constructor(
    public auth: AuthService,
    public router: Router,
    private store: Store<AppState>,
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  canActivate(): boolean {

    if (!this.auth.getToken() || this.auth.getToken() !== 'QWRtaW5Vc2Vy') {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }

}
