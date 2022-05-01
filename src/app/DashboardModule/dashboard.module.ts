import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AdminDashboardComponent, DashboardComponent, DashboardMenuComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        NgxChartsModule,
        RouterModule,
    ],
  exports: [AdminDashboardComponent, DashboardComponent, DashboardMenuComponent],
})
export class DashboardModule { }
