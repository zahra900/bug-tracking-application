import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import {User} from './user.model'
import {Role} from './role.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  usersChanged = new Subject<User[]>();
  
  constructor(private http: HttpClient) { }


  async  getUsers(): Promise<User[]>{
    return await this.http.get<User[]>(environment.apiUrl+'users').toPromise();
  }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(environment.apiUrl+'roles')
  }

  
  updateUsersRole(users: User[]):Observable<any>{
    return this.http.put<any>(environment.apiUrl+'users', users);
  } 

  UpdateUserList(users: User[]){
    this.usersChanged.next(users.slice())
  }


}
