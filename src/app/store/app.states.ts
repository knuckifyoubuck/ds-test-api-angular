import { authReducer, AuthState } from './reducers/auth.reducers'
import { dashboardReducer, DashboardState } from "./reducers/dashboard.reducers";

export interface AppState {
  authState: AuthState;
  dashboardState: DashboardState
}

export const reducers = {
  auth: authReducer,
  dashboard: dashboardReducer
}
