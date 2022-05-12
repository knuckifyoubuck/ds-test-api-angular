import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from "../../AuthModule/services/auth.service";
import {
  login,
  loginSuccess,
  loginFailure,
  logout
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  LogIn$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(action =>
      this.authService.logIn(action.email, action.password)
        .pipe(
          map(user => {
            return loginSuccess({
              token: user.token,
              email: action.email,
              first_name: user.first_name,
              last_name: user.last_name,
              role: user.role
            });
          }),
          catchError((error) => {
            return of(loginFailure({error: error}));
          })
        )
    )
  ));

  LogInSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap(user => {
      localStorage.setItem('token', user.token);
      if (user.role == 'Admin' || user.role == 'User'){
        this.router.navigateByUrl('/dashboard');
      }
    })
  ), {dispatch: false});

  LogInFailure$ = createEffect(() => this.actions$.pipe(
    ofType(loginFailure)
  ), {dispatch: false});

  LogOut$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      localStorage.removeItem('token')
      this.router.navigateByUrl('/log-in');
    })
  ), {dispatch: false})
}

