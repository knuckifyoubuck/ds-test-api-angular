import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Users } from "../../models/users";
import { UsersService } from "../../services/users.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UsersResolver implements Resolve<Users[]> {
  constructor(private usersService: UsersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Users[]> | Promise<Users[]> | Users[] {
    return this.usersService.getUsers();
  }
}
