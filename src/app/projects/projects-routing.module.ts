import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {ProjectListComponent} from './project-list/project-list.component'
import {ProjectEditComponent} from './project-edit/project-edit.component'
import {ProjectDetailComponent} from './project-detail/project-detail.component'

const routes: Routes = [
  {
    path: '', component: ProjectsComponent,
    children: [
      { path: '', component: ProjectListComponent },
      { path: ':id/edit', component: ProjectEditComponent },
      { path: 'new', component: ProjectEditComponent},
      { path: ':id', component: ProjectDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}