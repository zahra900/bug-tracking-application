import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/users/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersList: User[] = [];
  subscription: Subscription;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.usersChanged
      .subscribe(
        (users: User[]) => {
          this.usersList = users;
        }
      );
      console.log('in users component');
    this.getUsers();
  }

  getUsers(){
      this.userService.getUsers().then( data => {
        this.usersList = data;
    })
  }

}
