import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserAssessmentService } from "../services/user-assessment.service";
import { UserAssessmentReport } from "../models/user-assessment-report";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.states";
import { selectUserAssessmentChartData, selectUserAssessmentData } from "../../store/selectors/dashboard.selectors";
import { user_assessment, user_assessment_graph } from "../../store/actions/dashboard.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardComponent implements AfterViewInit {

  displayedColumns: string[] = [ "id", "name", "users_resolved", "active", "image_url"];
  userAssessmentData$ = this.store.select(selectUserAssessmentData);
  userAssessmentChartData$ = this.store.select(selectUserAssessmentChartData);

  expandedElement: UserAssessmentReport | null;

  isLoadingResults = true;

  constructor(
    private http: HttpClient,
    private userAssessmentsService: UserAssessmentService,
    private store: Store<AppState>
  ) { }

  ngAfterViewInit(): void {
    this.store.dispatch(user_assessment());
  }

  onUserAssessmentRow(id: number): void {
    this.store.dispatch(user_assessment_graph({id}));
  }

}
