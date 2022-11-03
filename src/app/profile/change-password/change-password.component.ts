import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ProfileService} from "../../service/profileService/profile.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  submitted = false;
  newPassword: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private profileService: ProfileService,) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.changePasswordForm.controls; }


  public changingPassFormValidation(){
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }
    this.newPassword = this.changePasswordForm.value;
    this.changePassword();
  }

  changePassword() {
    this.profileService.updatePassword(this.newPassword).subscribe(
      (resp: any) => {
        alert("Password was changed")
      },
      error => {
        alert("Something wrong while save password")
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
  }
}
