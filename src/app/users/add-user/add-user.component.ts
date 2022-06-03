import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/user.model";
import {Usermodel} from "../../models/usermodel.model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  newAddUserFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.newAddUserFormGroup = this.fb.group( {
      username : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      password : this.fb.control( null, [Validators.required, Validators.minLength(4)])
    });
  }

  handleSaveUser() {
    let user: Usermodel = this.newAddUserFormGroup.value;
    this.userService.ajouterUser(user).subscribe( {
      next : data => {
        alert("Bien enrégistrer!");
        this.router.navigateByUrl("/list-users").then(() => {
          // Do something
        });
      },
      error : err => {
        alert("Erreur lors de l'enrégistrer!");
        console.log(err);
      }
    });
  }
}
