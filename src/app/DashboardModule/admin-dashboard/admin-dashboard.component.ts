import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.states";
import { selectDashboardUsers } from "../../store/selectors/dashboard.selectors";
import { admin_users } from "../../store/actions/dashboard.actions";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ["first_name", "last_name", "email", "user_groups"];
  //users: Users[] = [];
  users$ = this.store.select(selectDashboardUsers);
  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(admin_users());
    //this.users = this.route.snapshot.data['payload'];
  }

}
