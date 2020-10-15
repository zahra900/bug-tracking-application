import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UsersComponent} from './users.component'
import {ManageRoleComponent} from './manage-role/manage-role.component'


const routes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: 'roles', component: ManageRoleComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}