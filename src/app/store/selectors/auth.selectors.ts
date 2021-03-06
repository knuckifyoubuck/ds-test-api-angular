import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducers";

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState) => state.errorMessage,
)

