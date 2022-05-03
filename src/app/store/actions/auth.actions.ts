import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout'
}

export const LogIn = createAction(
  AuthActionTypes.LOGIN,
  props<{email: string | undefined, password: string | undefined}>()
);

export const LogInSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{
    email: string | undefined,
    token: string,
    first_name: string,
    last_name: string,
    role: string}>()
)

export const LogInFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{error: string | undefined}>()
)

export const LogOut = createAction(
  AuthActionTypes.LOGOUT
)
