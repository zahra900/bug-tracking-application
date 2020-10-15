import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth-guard'

const routes: Routes = [
{
  path:"auth", 
  loadChildren: () =>
  import("./auth/auth.module").then(m => m.AuthModule)
},
{
  path:"projects", 
  loadChildren: () =>
  import("./projects/projects.module").then(m => m.ProjectsModule),
  canActivate: [AuthGuard]
},
{
  path:"tickets", 
  loadChildren: () =>
  import("./tickets/tickets.module").then(m => m.TicketsModule),
  canActivate: [AuthGuard]
},
{
  path:"users", 
  loadChildren: () =>
  import("./users/users.module").then(m => m.UsersModule),
  canActivate: [AuthGuard]
},

{ path: '**', redirectTo: 'projects' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
