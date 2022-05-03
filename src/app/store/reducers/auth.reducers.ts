import { User } from "../../AuthModule/models/user";
import {LogInFailure, LogInSuccess, LogOut} from "../actions/auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const reducer = createReducer(
  initialState,
  on(LogInSuccess, (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: {
      token: action.token,
      email: action.email,
      first_name: action.first_name,
      last_name: action.last_name,
      role: action.role
    },
    errorMessage: null
  })),
  on(LogInFailure, (state) => ({
    ...state,
    errorMessage: 'Incorrect email and/or password'
  })),
  on(LogOut, () => initialState)
)
