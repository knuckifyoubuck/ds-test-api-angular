import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DashboardState } from "../reducers/dashboard.reducers";

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectUserAssessmentData = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.userAssessmentData
)

export const selectUserAssessmentChartData = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.userAssessmentChartData
)

export const selectDashboardUsers = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.usersData
)
