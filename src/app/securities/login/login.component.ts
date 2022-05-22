import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newCustomerFormGroup!: FormGroup;
  err = 0;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group( {
      username : this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      password : this.fb.control( null, [Validators.required, Validators.minLength(2)])
    });
  }

  handleLogin() {
    let user: User = this.newCustomerFormGroup.value;
    this.onLoggedin(user);
  }

  onLoggedin(user: User): void {
    this.authService.login(user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }
  pwdForget(): void {
    this.router.navigate(['/pwd']);
  }



}
