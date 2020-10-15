import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  page = 1;
  projects: Project[] = [];
  currentSelectedPage: number = 0;
  totalPages: number = 5;
  pageSize: number = 5;
  pageIndexes: Array<number> = [];
  clickedIndex: number = 0;
  searchText: string = '';

  constructor(private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.getPageProject(0, 5);
  }

  getPageProject(pageNumber: number, size: number) {
    this.projectService.getPageProject(pageNumber, size).subscribe(data => {
      this.projects = data.content;
      this.totalPages = data.totalPages;
      this.currentSelectedPage = data.number;
      this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
    },
      (error) => {
        console.log(error);
      });
  }

  addProject() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id)
      .subscribe(data => {
        console.log(data)
        this.projects = this.projects.filter(u => u !== project);
        console.log(this.projects)
      },
        error => {
          console.log(error)
        })
  }

  editProject(project) {
    this.router.navigate([project.id, 'edit'], { relativeTo: this.route })
  }

  nextClick() {
    if(this.searchText !== '' && this.currentSelectedPage < this.totalPages - 1){
      this.clickedIndex = --this.currentSelectedPage;
      this.projectService.getPageProjectByword(this.currentSelectedPage, this.pageSize,this.searchText).subscribe(data => {
        this.projects = data.content;
      });
    }
    if(this.currentSelectedPage < this.totalPages - 1 && this.searchText === '') {
         this.clickedIndex = --this.currentSelectedPage;
         this.getPageProject(this.currentSelectedPage, this.pageSize);
    }
  }

  previousClick() {
    if(this.searchText !== '' && this.currentSelectedPage > 0){
      this.clickedIndex = --this.currentSelectedPage;
      this.projectService.getPageProjectByword(this.currentSelectedPage, this.pageSize,this.searchText).subscribe(data => {
        this.projects = data.content;
      });
    }
    if(this.currentSelectedPage > 0 && this.searchText === '') {
         this.clickedIndex = --this.currentSelectedPage;
         this.getPageProject(this.currentSelectedPage, this.pageSize);
    }
  }

  getPaginationWithIndex(index: number) {
    if(this.searchText != ''){
      this.projectService.getPageProjectByword(index,5,this.searchText).subscribe(data => {
        this.projects = data.content;
      });
    }
    else {
        this.getPageProject(index, 5);
    }
  }

  changeState(i: number) {
    this.clickedIndex = i;
  }

  somethingChanged(event){
    console.log('this.searchText',event)
    if(this.searchText != ''){
      this.projectService.getPageProjectByword(0,10,this.searchText).subscribe(data => {
        this.projects = data.content;
      });
    }
    else {
      this.getPageProject(0, 5);
    }
  }

}
