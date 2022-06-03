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
    const httpHeaders = this.jwtSecurity();
    return this.http.get<any[]>('http://localhost:8088/acl/liste/' + id, {headers: httpHeaders});
  }
  updateAcl(acl: Acl): Observable<Acl>{
    const httpHeaders = this.jwtSecurity();
    return this.http.put<Acl>('http://localhost:8088/acl/put', acl, {headers: httpHeaders});
  }

  deleteAcl(id: string, iD: string){
    const httpHeaders = this.jwtSecurity();
    return this.http.delete('http://localhost:8088/acl/remove/' + iD + '/' + id, {headers: httpHeaders});
  }
  getAcl(id: string, iD: string): Observable<AclModel>{
    return this.http.get<AclModel>('http://localhost:8088/acl/list/' + id + '/' + iD);
  }

  findAcl(id: string, iD: string): Observable<Acl>{
    const httpHeaders = this.jwtSecurity();
    return this.http.get<Acl>('http://localhost:8088/acl/take/' + id + '/' + iD, {headers: httpHeaders});
  }
  addAcl(acl: Acl): Observable<object>{
    const httpHeaders = this.jwtSecurity();
    return this.http.post('http://localhost:8088/acl/add', acl, {headers: httpHeaders});
  }

  jwtSecurity(): HttpHeaders{
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({Authorization: jwt});
    return httpHeaders;
  }
}
