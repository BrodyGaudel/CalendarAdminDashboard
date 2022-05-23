import { Component, OnInit } from '@angular/core';
import {Acl} from "../../models/acl.model";
import {AclService} from "../../services/acl/acl.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Calendar} from "../../models/calendar.model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  newAcl = new Acl();
  acls!: Observable<Acl[]>;
  idCalendar!: string;
  public call!: Acl[];
  errorMessage: any;

  constructor(private aclService: AclService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.idCalendar = this.activatedRoute.snapshot.params['id'];
    this.getAcls(this.idCalendar);
  }

  getAcls(id: string){
    this.acls = this.aclService.listAcls(id).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteAcl(a: Acl) {
    this.deleteAcl(a);
  }

  handleUpdateAcl(a: Acl) {
    this.router.navigate(['/update-acl', a.idC, a.id]);
  }

  deleteAclFromTab(prod: Acl) {
    this.call.forEach((cur: { id: string; }, index: any) => {
      const r = prod.id.localeCompare(cur.id);
      if (r === 0) {
        this.call.splice(index, 1);
      }
    });
  }
  deleteAcl(a: Acl): void{
    const conf = confirm('Etes-vous sûr de vouloir supprimer?');
    if (conf){
      const resp = this.aclService.deleteAcl(a.id,a.idC).subscribe(() => {
        console.log('Agenda supprimé!');
        this.deleteAclFromTab(a);
      });
    }

  }
}
