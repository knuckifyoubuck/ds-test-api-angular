import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserAssessmentService } from "../services/user-assessment.service";
import { UserAssessment } from "../models/user-assessment";
import { UserAssessmentReport } from "../models/user-assessment-report";
import { UserAssessmentChartData } from "../models/user-assessment-chart-data";
import { animate, state, style, transition, trigger } from "@angular/animations";

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
  userAssessmentsService: UserAssessmentService;
  userAssessmentData: UserAssessment[] = [];
  userAssessmentReport: UserAssessmentReport;
  userAssessmentChartData: UserAssessmentChartData[] = [];

  expandedElement: UserAssessmentReport | null;

  isLoadingResults = true;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.userAssessmentsService = new UserAssessmentService(this.http);

    this.userAssessmentsService.getUserAssessments()
      .subscribe(data => {
        this.userAssessmentData = data;
      })
  }

  onUserAssessmentRow(id: number): void {
    this.userAssessmentsService.getUserAssessmentReports(id)
      .subscribe(data => {
        this.userAssessmentReport = data;
        this.userAssessmentChartData = this.formatChartData(this.userAssessmentReport.data);
      })
  }

  formatChartData(data: any): UserAssessmentChartData[] {
    let formattedData: UserAssessmentChartData[] = [];
    for (let key in data) {
      formattedData.push({
        name: key,
        value: data[key]
      })
    }
    return formattedData;
  }

}
