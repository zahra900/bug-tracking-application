import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { ManageRoleComponent } from './manage-role/manage-role.component';
import { UsersComponent } from './users.component';

import{UserRoutingModule} from './user-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserListComponent, ManageRoleComponent, UsersComponent],
  imports: [
    CommonModule,
    RouterModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
