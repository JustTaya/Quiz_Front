import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {AuthenticationService} from "../service/loginService/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: User = {
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
