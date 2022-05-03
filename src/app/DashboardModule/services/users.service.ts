import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/users";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users[]> {
    const url = `${environment.BASE_URL}${environment.AdminUsersAPI}`
    return this.http.get<Users[]>(url);
  }

}
