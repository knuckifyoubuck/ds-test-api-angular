import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Users } from "../../models/users";
import { UsersService } from "../../services/users.service";
import { Observable, take} from "rxjs";
import { select, Store } from "@ngrx/store";
import { AppState } from "../../../store/app.states";
import { selectDashboardUsers } from "../../../store/selectors/dashboard.selectors";
import { admin_users } from "../../../store/actions/dashboard.actions";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class UsersResolver implements Resolve<Users[]> {
  constructor(private usersService: UsersService, private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users[]> | Promise<Users[]> | Users[] {
    //TODO: how to make normal working resolver with store select ? (first select is empty, but next ok)
    return this.store.pipe(
      tap(() => this.store.dispatch(admin_users())),
      select(selectDashboardUsers),
      take(1),
    );
  }
}
