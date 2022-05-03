import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsersService } from "../services/users.service";
import { Users } from "../models/users";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements AfterViewInit {

  displayedColumns: string[] = ["first_name", "last_name", "email", "user_groups"];
  usersService: UsersService;
  users: Users[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.usersService = new UsersService(this.http);

    this.usersService.getUsers()
      .subscribe(data => {
        this.users = data;
        console.log(this.users);
      })
  }

}
