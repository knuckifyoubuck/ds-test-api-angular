import { createAction, props } from '@ngrx/store';
import { UserAssessment } from "../../DashboardModule/models/user-assessment";
import { UserAssessmentChartData } from "../../DashboardModule/models/user-assessment-chart-data";
import { Users } from "../../DashboardModule/models/users";

export enum DashboardActionTypes {
  USER_ASSESSMENT = '[Dashboard] User Assessment Data',
  LOAD_USER_ASSESSMENT = '[Dashboard] Load User Assessment Data',
  USER_ASSESSMENT_GRAPH = '[Dashboard] User Assessment Graph',
  LOAD_USER_ASSESSMENT_GRAPH = '[Dashboard] Load User Assessment Graph',
  USERS = '[Dashboard] Users',
  LOAD_USERS = '[Dashboard] Load Users',
  LOGOUT_CLEAR = '[Dashboard] Clear Dashboard Data on Login'
}

export const user_assessment = createAction(
  DashboardActionTypes.USER_ASSESSMENT
);

export const load_user_assessment = createAction(
  DashboardActionTypes.LOAD_USER_ASSESSMENT,
  props<{ userAssessment: UserAssessment[] }>()
);

export const user_assessment_graph = createAction(
  DashboardActionTypes.USER_ASSESSMENT_GRAPH,
  props<{ id: number }>()
);

export const load_user_assessment_graph = createAction(
  DashboardActionTypes.LOAD_USER_ASSESSMENT_GRAPH,
  props<{ id: number, userAssessmentGraph: UserAssessmentChartData[] }>()
);

export const admin_users = createAction(
  DashboardActionTypes.USERS
);

export const load_admin_users = createAction(
  DashboardActionTypes.LOAD_USERS,
  props<{ users: Users[] }>()
);

export const logout_clear = createAction(
  DashboardActionTypes.LOGOUT_CLEAR
)
