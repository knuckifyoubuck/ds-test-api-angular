import { UserAssessment } from "../../DashboardModule/models/user-assessment";
import { UserAssessmentChartData } from "../../DashboardModule/models/user-assessment-chart-data";
import { Users } from "../../DashboardModule/models/users";
import { createReducer, on } from "@ngrx/store";
import {
  load_user_assessment,
  load_user_assessment_graph,
  load_admin_users,
  logout_clear
} from "../actions/dashboard.actions";

export interface DashboardState {
  userAssessmentData: UserAssessment[];
  userAssessmentChartData: UserAssessmentChartData[];
  usersData: Users[];
}

export const initialState: DashboardState = {
  userAssessmentData: [],
  userAssessmentChartData: [],
  usersData: []
}

export const dashboardReducer = createReducer(
  initialState,
  on(load_user_assessment, (state, action) => ({
    ...state,
    userAssessmentData: action.userAssessment
  })),
  on(load_user_assessment_graph, (state, action) => ({
    ...state,
    userAssessmentChartData: action.userAssessmentGraph
  })),
  on(load_admin_users, (state, action) => ({
    ...state,
    usersData: action.users
  })),
  on(logout_clear, () => ({
    ...initialState
  }))
);

