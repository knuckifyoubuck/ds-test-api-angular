import { User } from "../../AuthModule/models/user";
import { loginFailure, loginSuccess, logout } from "../actions/auth.actions";
import { createReducer, on } from "@ngrx/store";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
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
  on(loginFailure, (state) => ({
    ...state,
    errorMessage: 'Incorrect email and/or password'
  })),
  on(logout, () => initialState)
)
