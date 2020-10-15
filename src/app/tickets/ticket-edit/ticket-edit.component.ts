import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TicketService } from 'src/app/tickets/ticket.service'
import { UserService } from 'src/app/users/user.service';
import { ProjectService } from 'src/app/projects/project.service';
import { User } from '../../users/user.model'
import { Project } from 'src/app/projects/project.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  pagetitle: string;
  bug: FormGroup;
  fileToUpload: File = null;
  usersList: User[] = [];
  formData: FormData = new FormData();
  projectList: Project[] = [];
  statusList = [{ name: "open", value: "Open" },
                { name: "In progress", value: "InProgress" },
                { name: "reopened", value: "Reopened" },
                { name: "resolved", value: "Resolved" },
                { name: "closed", value: "Closed" }]
  priorityList = [{ name: "low", value: "LOW" },
                  { name: "meduim", value: "MEDIUM" },
                  { name: "high", value: "HIGH" }]

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private route: ActivatedRoute, 
              private ticketService: TicketService, 
              private userService: UserService, 
              private projectService: ProjectService) { }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.pagetitle = this.editMode ? 'Edit Ticket' : 'Add Ticket';
      this.initForm();
    });
    this.getUsers();
    this.getProjects();
  }

  initForm() {

    this.bug = this.fb.group({
      title: ['', Validators.required],
      bugDescription: [''],
      resolutionSummary: [''],
      createdDate: [''],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      assignee: this.fb.group({ email: ['', Validators.required] }),
      project: this.fb.group({ id: ['', Validators.required] }),
      file: this.fb.group({id: ['']})
    })

    if (this.editMode) {
      this.ticketService.getTicket(this.id).subscribe(tick => {
        this.bug = this.fb.group({
          id: [tick.id],
          title: [tick.title, Validators.required],
          bugDescription: [tick.bugDescription],
          resolutionSummary: [tick.resolutionSummary],
          createdDate: [tick.createdDate],
          status: [tick.status, Validators.required],
          priority: [tick.priority, Validators.required],
          assignee: this.fb.group({ email: [tick.assignee.email, Validators.required] }),
          project: this.fb.group({ id: [tick.project.id, Validators.required] }),
          file: this.fb.group({id: ['']})
        })
      });
    }
  }

  get title() {
    return this.bug.get('title');
  }
  get status() {
    return this.bug.get('status');
  }
  get priority() {
    return this.bug.get('priority');
  }
  get assignee() {
    return this.bug.get('assignee').get('email');
  }

  get project() {
    return this.bug.get('project').get('id');
  }

  getUsers() {
    this.userService.getUsers().then(data => {
      this.usersList = data;
    })
  }

  getProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projectList = data;
    })
  }

  onCancel() {
    this.router.navigate(['/tickets'])
  }

  handleFileInput(files) {
    this.fileToUpload = files.item(0);
    this.formData.append('file',this.fileToUpload);
  }

  onSubmit() {
    if (!this.editMode) {
      if( this.formData) {
        this.ticketService.uploadFile(this.formData).then(data => {
        })
      }
      this.ticketService.createTicket(this.bug.value).subscribe(data => {
        this.router.navigate(['/tickets']);
      })
    } else {
      this.ticketService.updateTicket(this.bug.value).subscribe(data => {
        this.router.navigate(['/tickets']);
      })
    }
  }



}
