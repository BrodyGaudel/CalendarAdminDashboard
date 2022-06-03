import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AclService} from "../../services/acl/acl.service";
import {Acl} from "../../models/acl.model";

@Component({
  selector: 'app-update-acl',
  templateUrl: './update-acl.component.html',
  styleUrls: ['./update-acl.component.css']
})
export class UpdateAclComponent implements OnInit {

  acl = new Acl();
  idCalendar!: string;
  idAcl!: string;
  selectedDay = '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private aclService: AclService) { }

  ngOnInit(): void {
    this.idCalendar = this.activatedRoute.snapshot.params['id'];
    this.idAcl = this.activatedRoute.snapshot.params['id2'];
    this.aclService.findAcl(this.idCalendar, this.idAcl).subscribe( prod => {
      this.acl = prod;
    } ) ;
  }

  updateAcl() {
    this.acl.id = this.activatedRoute.snapshot.params['id2'];
    this.acl.idC = this.activatedRoute.snapshot.params['id'];
    this.aclService.updateAcl(this.acl).subscribe(() => {
        this.router.navigate(['calendars']);
      }, (error) => { alert('Problème lors de la modification !'); }
    );
  }

  selectChangeHandler(event: any): void {
    this.selectedDay = event.target.value;
    this.acl.role = event.target.value;
  }
}
