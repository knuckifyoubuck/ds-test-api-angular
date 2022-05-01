import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from "../../AuthModule/services/auth.service";
import {
  LogIn,
  LogInSuccess,
  LogInFailure, LogOut
} from '../actions/auth.actions';
import { Store } from "@ngrx/store";
import { AppState, selectAuthState } from "../app.states";
import { User } from "../../AuthModule/models/user";

@Injectable()
export class AuthEffects {

  getState: Observable<any>;
  user: User = {};

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.user = state.user;
    })
    console.log(this.user);
  }

  LogIn$ = createEffect(() => this.actions$.pipe(
    ofType(LogIn),
    switchMap(action =>
      this.authService.logIn(action.email, action.password)
        .pipe(
          map(user => {
            console.log(user);
            return LogInSuccess({
              token: user.token,
              email: action.email,
              first_name: user.first_name,
              last_name: user.last_name,
              role: user.role
            });
          }),
          catchError((error) => {
            console.log(error);
            return of(LogInFailure({error: error}));
          })
        )
    )
  ));

  LogInSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(LogInSuccess),
    tap(user => {
      localStorage.setItem('token', user.token);

      // if (localStorage.getItem('token') === 'QWRtaW5Vc2Vy')
      //   this.router.navigateByUrl('/admin-dashboard')
      // else if (localStorage.getItem('token') === 'VXNlclVzZXI=')
      //   this.router.navigateByUrl('/user');
      if (user.role == 'Admin' || user.role == 'User'){
        this.router.navigateByUrl('/dashboard');
      }
    })
  ), {dispatch: false});

  LogInFailure$ = createEffect(() => this.actions$.pipe(
    ofType(LogInFailure)
  ), {dispatch: false});

  LogOut$ = createEffect(() => this.actions$.pipe(
    ofType(LogOut),
    tap(() => {
      localStorage.removeItem('token')
    })
  ), {dispatch: false})
}

