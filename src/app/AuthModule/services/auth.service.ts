import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, shareReplay } from "rxjs";
import { User } from "../models/user";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logIn(email: string | undefined, password: string | undefined): Observable<any> {
    const url = `${environment.BASE_URL}${environment.LogInAPI}`
    return this.http.post<User>(url, {email: email, password: password}).pipe(
      shareReplay()
    );
  }

}
