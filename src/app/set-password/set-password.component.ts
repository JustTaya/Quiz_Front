import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../service/profileService/profile.service';
import {AuthenticationService} from '../service/loginService/authentication.service';
import {switchMap} from 'rxjs/operators';
import {UserActive} from '../models/user-active';
import {User} from "../models/user";

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  submitted = false;
  newPassword: string;
  code: string;
  userId: number;
  public user: User;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('code'))
    )
      .subscribe(data => this.code = data);
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    if (localStorage.getItem('currentUser') !== null) {
      this.logout();
    }
    this.getUser();
  }
  get f() { return this.changePasswordForm.controls; }

  logout() {
    localStorage.removeItem('currentUser');
    window.location.replace('/activate/'  + this.code);
  }

  public changingPassFormValidation(){
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }
    this.newPassword = this.changePasswordForm.value.password;
    this.setPassword();
    window.location.replace('/login');
  }

  setPassword() {
    this.authService.setPassword(this.user.id, this.newPassword).subscribe(
      (resp: any) => {
        alert('Password setted');
      },
      error => {
        alert('Something wrong while save password');
      }
    );
  }
  getUser(){
    this.authService.getUserbyCode(this.code).subscribe(
      (resp: any) => {
        this.user = resp;
      },
      error => {
        console.log(error);
        alert('Something wrong with downloading user');
      }
    );
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
  };
}

