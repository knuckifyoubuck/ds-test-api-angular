import { Component } from '@angular/core';
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.states";
import { Router } from "@angular/router";
import { LogOut } from "../../store/actions/auth.actions";
import { AuthService } from "../../AuthModule/services/auth.service";

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public auth: AuthService
  ) { }

  onLogout(): void {
    this.store.dispatch(LogOut());
    this.router.navigateByUrl('/log-in');
  }

}
