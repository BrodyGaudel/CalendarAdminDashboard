import { Component, OnInit } from '@angular/core';
import {Usermodel} from "../../models/usermodel.model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-pwd',
  templateUrl: './pwd.component.html',
  styleUrls: ['./pwd.component.css']
})
export class PwdComponent implements OnInit {
  user = new Usermodel();
  err = 0;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSend() {
    this.authService.send(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/update-user']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }
}
