import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.states";
import { User } from "../models/user";
import { selectErrorMessage } from "../../store/selectors/auth.selectors";
import { login } from '../../store/actions/auth.actions'
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user = new User();
  errorMessage$= this.store.select(selectErrorMessage);
  destroy$: Subject<Boolean> = new Subject<Boolean>();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get email(): AbstractControl {
    return <AbstractControl>this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return <AbstractControl>this.loginForm.get('password');
  }

  onSubmit(): void {
    this.store.dispatch(login({
      email: this.user.email,
      password: this.user.password!,
    }));
  }

  errorMessageSnackBar(): void {
    this.errorMessage$.pipe(takeUntil(this.destroy$)).subscribe(errorMessage => {
      if (errorMessage) {
        this._snackBar.open(errorMessage, 'Ok', {duration: 2000});
      }
    });
  }

}
