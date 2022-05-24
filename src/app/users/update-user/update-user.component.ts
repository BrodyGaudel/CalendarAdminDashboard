import { Component, OnInit } from '@angular/core';
import {Profile} from "../../models/profile.model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  profile = new Profile();
  err = 0;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClickOn() {
    this.authService.updateProfile(this.profile).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.err = 1;
      }
    });
  }
}
