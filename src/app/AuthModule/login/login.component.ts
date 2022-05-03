import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { User } from "../models/user";
import { AppState, selectAuthState } from "../../store/app.states";
import { LogIn } from '../../store/actions/auth.actions'
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    })
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.store.dispatch(LogIn({
      email: this.user.email,
      password: this.user.password,
    }));
  }

  errorMessageSnackBar(message: string, action: string, duration: number) {
    if (this.errorMessage) {
      this._snackBar.open(message, action, {
        duration: duration * 1000,
      });
    }
  }

}
