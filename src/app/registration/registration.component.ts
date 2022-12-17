import { Component, OnInit } from '@angular/core';
import {RegistrationService} from '../service/registrationService/registration.service';
import {User} from '../models/user';
import {AuthenticationService} from '../service/loginService/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

export enum Gender{
  MALE,
  FEMALE,
  NOT_MENTIONED
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  public Gender = Gender;

  model: User = {
    image: undefined,
    notificationStatus: undefined,
    about: '',
    birthdate: undefined,
    city: "",
    countryId: "",
    gender: undefined,
    name: "",
    rating: "",
    role: undefined,
    surname: "",
    id:null,
    email:'',
    password:''
  };

  constructor(
    public service: RegistrationService,
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router){
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      surname: [''],
      gender: [Gender.NOT_MENTIONED],
      birthdate: ['1973-01-01'],
      city: [''],
      about: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const input: User = JSON.parse(JSON.stringify(this.registerForm.value));
    this.model.email = input.email;
    this.model.password = input.password;
    this.model.name = input.name;
    this.model.surname = input.surname;
    this.model.gender = input.gender;
    this.model.birthdate = input.birthdate;
    this.model.city = input.city;
    this.model.about = input.about;
    this.register();
  }


  register(): void{
    this.service.postRegisterInfo(this.model).subscribe(
      res =>{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/']);
        });
        alert("You registered");
      },
      error => {
        alert(error.error['message']);
      }
    );
  }

  get f() { return this.registerForm.controls; }
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

