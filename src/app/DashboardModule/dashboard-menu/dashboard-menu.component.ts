import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.states";
import { AuthService } from "../../AuthModule/services/auth.service";
import { logout } from "../../store/actions/auth.actions";
import { logout_clear } from "../../store/actions/dashboard.actions";

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.css']
})
export class DashboardMenuComponent {

  constructor(
    private store: Store<AppState>,
    public auth: AuthService
  ) { }

  onLogout(): void {
    this.store.dispatch(logout());
    this.store.dispatch(logout_clear());
  }

}
