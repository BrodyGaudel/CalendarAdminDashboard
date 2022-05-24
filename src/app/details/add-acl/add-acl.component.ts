import { Component, OnInit } from '@angular/core';
import {Acl} from "../../models/acl.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AclService} from "../../services/acl/acl.service";

@Component({
  selector: 'app-add-acl',
  templateUrl: './add-acl.component.html',
  styleUrls: ['./add-acl.component.css']
})
export class AddAclComponent implements OnInit {

  newAcl = new Acl();
  public call!: Acl[];
  message!: string;
  selectedDay = '';

  idC!: string

  constructor(private activatedRoute: ActivatedRoute,
              private aclService: AclService,
              private router: Router) { }

  ngOnInit(): void {
    this.idC = this.activatedRoute.snapshot.params['id'];
  }

  addAcl() {
    this.newAcl.idC = this.idC;
    this.aclService.addAcl(this.newAcl).subscribe(cale => {
      console.log(cale);

    });
    this.router.navigate(['calendars']).then(() => {
      window.location.reload();
    });
  }

  selectChangeHandler(event: any): void {
    this.selectedDay = event.target.value;
    this.newAcl.role = event.target.value;
  }
}
