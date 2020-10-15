import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from './user.model';
import {environment} from '../../environments/environment'


@Injectable({providedIn: 'root'})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
       return this.currentUserSubject.value;
   }

  login(body: string){
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Basic ' + btoa('my-app-client:zahra-secret'));

    return this.http.post<any>(environment.apiUrl+'oauth/token',body, { headers: headers})
    .pipe(map(data => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }

  isAdmin() {
      try {
        let currentUser = this.currentUserValue;
        let decodedJwtJsonData =  JSON.parse(atob(currentUser['access_token'].split('.')[1]));
        console.log(decodedJwtJsonData['authorities'].includes('ROLE_ADMIN'))
        return decodedJwtJsonData['authorities'].includes('ROLE_ADMIN');
      } catch (e) {
        return null;
      }
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
