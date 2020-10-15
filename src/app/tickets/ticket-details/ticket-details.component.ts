import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ticket } from '../ticket.model';
import { Comment } from '../comment.model';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  comment: FormGroup;
  comments: Comment[] = [];
  id: number;
  bug: Ticket = new Ticket();

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute, 
              private ticketService: TicketService ) {
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.ticketService.getTicket(this.id).subscribe( tick => {
           this.bug = tick;
      })
    this.getComments();
    });
    this.comment = this.fb.group({
      bug :  this.fb.group({id:[this.id,Validators.required]}),
      message: ['']
    })
  }

  getComments() {
    this.ticketService.getCommentList().subscribe( comments => {
          this.comments = comments;
    })
  }

  deleteComment(id: number) {
    this.ticketService.deleteComment(id).subscribe(data => {
      this.getComments();
    })
  }

  onSubmit() {
    this.ticketService.addComment(this.comment.value).subscribe( comment => {
        this.comment.get('message').reset();
        this.getComments();
    })
  }

}
