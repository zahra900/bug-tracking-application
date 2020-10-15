import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser: User;
  status: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
        this.authService.currentUser.subscribe(currUser => {
          this.currentUser = currUser
        })
  } 
}
