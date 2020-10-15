import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/users/user.model';
import { Role } from '../role.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  
  usersList: User[] = [];
  users:any[]=[];
  rolesList: Role[] = [];
  emailsList: any[] = [];
  usersRole: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.usersRole = this.fb.group({
      user: ['', Validators.required],
      role: this.fb.group({
        id:['', Validators.required]
      })
    })
    this.getRolesList();
    this.getUsersList();
  }

  getUsersList(): User[] {
    this.userService.getUsers().then( data => {
        this.usersList = data;
    })
    return this.usersList;
  }

  getRolesList(){
    this.userService.getRoles().subscribe( data => {
      this.rolesList = data;
    })
  }

  onSubmit() {

    this.usersRole.controls.user.value.forEach(element => {
      var role = { role: this.usersRole.controls.role.value};
      this.users.push(Object.assign({}, element, role));
    });
    this.userService.updateUsersRole(this.users).subscribe(data => {
      this.userService.getUsers().then( usersl => {
      this.userService.usersChanged.next(usersl.slice())});
    })
  }

}
