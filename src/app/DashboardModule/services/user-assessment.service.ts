import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserAssessment } from "../models/user-assessment";
import { UserAssessmentReport } from "../models/user-assessment-report";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserAssessmentService {

  constructor(private http: HttpClient) { }

  getUserAssessments(): Observable<UserAssessment[]> {
    const url = `${environment.BASE_URL}${environment.UserAssessmentsAPI}`
    return this.http.get<UserAssessment[]>(url);
  }

  getUserAssessmentReports(id: number): Observable<UserAssessmentReport> {
    const url = `${environment.BASE_URL}${environment.UserAssessmentsGraphAPI}`
    return this.http.get<UserAssessmentReport>(url, {
      params: new HttpParams()
        .set('id', id)
    });
  }

}
