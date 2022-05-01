import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { LoginComponent } from './AuthModule/login/login.component';
import { AdminDashboardComponent } from './DashboardModule/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './DashboardModule/dashboard/dashboard.component';
import { AuthEffects } from "./store/effects/auth.effects";
import { reducers } from "./store/app.states";
import { AuthGuardService } from "./AuthModule/services/auth-guard.service";
import { AdminGuardService } from "./AuthModule/services/admin-guard.service";

import { AuthModule } from "./AuthModule/auth.module";
import { DashboardModule } from "./DashboardModule/dashboard.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    DashboardModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
      {path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuardService]},
      {path: '**', redirectTo: '/login'},
    ]),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
