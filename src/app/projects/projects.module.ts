import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects.component';
import { RouterModule } from '@angular/router';
import {ProjectsRoutingModule} from './projects-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [ProjectListComponent, ProjectEditComponent, ProjectDetailComponent, ProjectsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProjectsModule { }
