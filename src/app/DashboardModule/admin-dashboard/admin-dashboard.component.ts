import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UsersService } from "../services/users.service";
import { Users } from "../models/users";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  displayedColumns: string[] = ["first_name", "last_name", "email", "user_groups"];
  usersService: UsersService;
  users: Users[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.users = this.route.snapshot.data['payload'];
  }

}
