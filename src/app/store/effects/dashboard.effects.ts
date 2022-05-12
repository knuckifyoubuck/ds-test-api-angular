import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, exhaustMap} from 'rxjs';

import { UserAssessmentService } from "../../DashboardModule/services/user-assessment.service";
import {
  user_assessment,
  user_assessment_graph,
  admin_users,
  load_user_assessment,
  load_user_assessment_graph,
  load_admin_users
} from '../actions/dashboard.actions';
import { UserAssessmentReportData } from "../../DashboardModule/models/user-assessment-report";
import { UserAssessmentChartData } from "../../DashboardModule/models/user-assessment-chart-data";
import { UsersService } from "../../DashboardModule/services/users.service";

@Injectable()
export class DashboardEffects {

  constructor(
    private actions$: Actions,
    private userAssessmentService: UserAssessmentService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void { }

  userAssessment$ = createEffect(() => this.actions$.pipe(
    ofType(user_assessment),
    switchMap(() =>
      this.userAssessmentService.getUserAssessments()
        .pipe(
          map(userAssessmentData => {
            return load_user_assessment({userAssessment: userAssessmentData})
          }),
          catchError(() => EMPTY)
        ))
  ));

  userAssessmentReport$ = createEffect(() => this.actions$.pipe(
    ofType(user_assessment_graph),
    exhaustMap(action =>
      this.userAssessmentService.getUserAssessmentReports(action.id)
        .pipe(
          map(userAssessmentReport => {
            let formattedChartData = this.formatChartData(userAssessmentReport.data)
            return load_user_assessment_graph({id: action.id, userAssessmentGraph: formattedChartData})
          })
        ))
  ));

  users$ = createEffect(() => this.actions$.pipe(
    ofType(admin_users),
    switchMap(() =>
      this.usersService.getUsers()
        .pipe(
          map(users => {
            return load_admin_users({users: users})
          }),
          catchError(() => EMPTY)
        ))
  ));

  formatChartData(data: UserAssessmentReportData): UserAssessmentChartData[] {
    let formattedData: UserAssessmentChartData[] = [];
    for (let key in data) {
      formattedData.push({
        name: key,
        value: data[key as keyof UserAssessmentReportData]
      })
    }
    return formattedData;
  }

}

