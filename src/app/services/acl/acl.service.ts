import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {AclModel} from "../../models/aclmodel.model";
import {Acl} from "../../models/acl.model";

@Injectable({
  providedIn: 'root'
})
export class AclService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  listAcl(id: string): Observable<AclModel[]>{
    return this.http.get<any[]>('http://localhost:8088/acl/list/' + id);
  }
  listAcls(id: string): Observable<Acl[]>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get<any[]>('http://localhost:8088/acl/liste/' + id, {headers: httpHeaders});
  }
  updateAcl(acl: Acl): Observable<Acl>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.put<Acl>('http://localhost:8088/acl/put', acl, {headers: httpHeaders});
  }
  // tslint:disable-next-line:typedef
  deleteAcl(id: string, iD: string){
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.delete('http://localhost:8088/acl/remove/' + iD + '/' + id, {headers: httpHeaders});
  }
  getAcl(id: string, iD: string): Observable<AclModel>{
    return this.http.get<AclModel>('http://localhost:8088/acl/list/' + id + '/' + iD);
  }

  findAcl(id: string, iD: string): Observable<Acl>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.get<Acl>('http://localhost:8088/acl/take/' + id + '/' + iD, {headers: httpHeaders});
  }
  addAcl(acl: Acl): Observable<object>{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return this.http.post('http://localhost:8088/acl/add', acl, {headers: httpHeaders});
  }
}
