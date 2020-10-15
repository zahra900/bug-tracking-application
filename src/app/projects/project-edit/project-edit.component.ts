import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { User } from 'src/app/users/user.model';
import {UserService} from '../../users/user.service'
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})

export class ProjectEditComponent implements OnInit {

  id: number;
  editMode = false;
  project: FormGroup;
  usersList: User[] ;
  emailsList: any[] = [];
  data: Project;
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private userService: UserService,
    private projectService: ProjectService
  ) { 
    this.getUsersList();
  }

  ngOnInit(): void { 
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.title = this.editMode ? 'Edit Project' : 'Add Project';
      this.initForm();
      this.bugs.controls.forEach(bug => console.log("bug",bug))
    });
  }
  
  private initForm() {

    let projectName = '';
    let description = '';
    let bugs = new FormArray([]);
    let users = [];
    
    this.project = this.fb.group({
      id:[this.id],
      projectName: [projectName,Validators.required],
      description: [description],
      bugs : bugs,
      users: [users, [Validators.required]]
    })
    if(this.editMode) {
      this.projectService.getProject(this.id).subscribe( proj => {
        console.log("proj",proj);
        if(proj.bugs) {
          for(let bug of proj.bugs) {
            bugs.push(new FormGroup({
              id: new FormControl(bug.id),
              title: new FormControl(bug.title),
              createdDate: new FormControl(bug.createdDate),
              status: new FormControl(bug.status),
              priority: new FormControl(bug.status),
              assignee: new FormControl(bug.assignee.username),
              assigner: new FormControl(bug.assigner.username),
            }))
          }
        }
        proj.users.forEach(user => {users.push(user.email)})
        this.project = this.fb.group({
          id:[this.id],
          projectName: [proj.projectName,Validators.required],
          description: [proj.description],
          bugs : bugs,
          users: [users, [Validators.required]]
        }) 
        console.log('project', this.project);
      });    
    }
  }
  
  get projectName() {
    return this.project.get('projectName');
  }
  get users() {
    return this.project.get('users');
  }
  get bugs(): FormArray  {
    return this.project.get("bugs") as FormArray
	}

  getUsersList(){
    this.userService.getUsers().then( data => {
      console.log('users',data)
        this.usersList = data;
      console.log('this.usersList',this.usersList)
    })
  }

  createBug(){
    return this.fb.group({
      id:''
    });
  }

  createUser(){
    return this.fb.group({
        email: ''
    });
  }

  onUsersChange(){
  }

  onCancel() {
    this.router.navigate(['/projects']);
  }

  onSubmit(){

    if(this.project.valid)
    { 
      var formData: any = new FormData();
      formData.append("projectName", this.project.get('projectName').value);
      formData.append("description", this.project.get('description').value);
      this.project.get('users').value.forEach(element => {
        this.emailsList.push({ "email" : element})
      });

      this.data = {
        "id": this.project.get('id').value,
        "projectName":this.project.get('projectName').value,
        "description":this.project.get('description').value,
        "users":this.emailsList
      }
  
      formData.append("users", this.emailsList);

    if(!this.editMode) {
      this.projectService.createProject(this.data).subscribe(proj => {
          this.router.navigate(['/projects']);
      });
    }
    else {
      console.log("submit", this.data)
      this.projectService.updateProject(this.data).subscribe(proj => {
        this.router.navigate(['/projects']);
    });
    }
    }

  }

  

}
