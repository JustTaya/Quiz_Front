import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {AuthenticationService} from "../service/loginService/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: User = {
    image: undefined, notificationStatus: undefined,
    about: "",
    birthdate: undefined,
    city: "",
    countryId: "",
    gender: undefined,
    name: "",
    rating: "",
    role: undefined,
    surname: "",
    id: null,
    email: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  Login() {
    this.authenticationService.login(this.model.email, this.model.password);
  }
}
