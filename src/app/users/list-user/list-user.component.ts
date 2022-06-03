import { Component, OnInit } from '@angular/core';
import {Usermodel} from "../../models/usermodel.model";
import {catchError, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  usermodels!: Observable<any[]>;
  public cal!: Usermodel[];
  live: any;

  errorText!: string;
  searchFormGroupe: FormGroup | undefined;

  constructor(private fb: FormBuilder,
              private router:Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.searchFormGroupe=this.fb.group({
      keyword : this.fb.control("")
    });
    this.listUsers();
  }


  handleDeleteUser(u: Usermodel) {
    this.deleteUser(u);
  }

  handleSearchUsers() {
    let kw=this.searchFormGroupe?.value.keyword;
    this.usermodels =this.userService.findUserByUsername(kw).pipe(
      catchError(err => {
        this.errorText =err.message;
        return throwError(err);
      })
    );
  }

  listUsers(){
    this.usermodels =this.userService.listUser();
  }

  deleteUserFromTab(prod: Usermodel) {
    this.cal.forEach((cur, index) => {
      if (prod.userid === cur.userid) {
        this.cal.splice(index, 1);
      }
    });
  }
  deleteUser(u: Usermodel): void{
    const conf = confirm('Etes-vous sûr de vouloir supprimer?');
    if (conf){
      const resp = this.userService.deleteUser(u.userid).subscribe(() => {
        console.log('Agenda supprimé!');
        this.deleteUserFromTab(u);
      });
    }

  }

  gotoAddUser() {
    this.router.navigate(['/add-user']).then(r => {
      alert("Voulez vous ajouter un nouvel administrateur? Notez qu'il aura les memes droits que vous sur tous les services de cette application.");
    });
  }
}
