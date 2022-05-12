import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout'
}

export const login = createAction(
  AuthActionTypes.LOGIN,
  props<{email: string, password: string}>()
);

export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{
    email: string,
    token: string,
    first_name: string,
    last_name: string,
    role: string}>()
)

export const loginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{error: string}>()
)

export const logout = createAction(
  AuthActionTypes.LOGOUT
)
