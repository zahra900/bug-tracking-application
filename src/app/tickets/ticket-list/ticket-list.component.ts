import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { contains } from 'jquery';
import { Ticket } from '../ticket.model';
import{TicketService} from '../ticket.service'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  totalPages: number = 0;
  currentSelectedPage: number = 0;
  pageIndexes: Array<number> = [];
  clickedIndex: number = 0;
  pageSize: number = 3;
  searchText: string = '';

  constructor(private ticketService: TicketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPageTicket(this.currentSelectedPage,this.pageSize);
  }

  getPageTicket(pageNumber: number, size: number){

    this.ticketService.getPageTicket(pageNumber,size).subscribe(data =>  {
      this.tickets = data.content;
      this.totalPages = data.totalPages;
      this.currentSelectedPage = data.number;
      this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);  
    },
    (error) => {
        
    });

  }

  getAllTickets(){
    this.ticketService.getTickets().subscribe( ticketList => {
      this.tickets = ticketList;
    })
  }
  addTicket(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  
  deleteTicket(ticket){
   this.ticketService.deleteTicket(ticket.id).subscribe(data => {
    this.tickets = this.tickets.filter(u => {u.id ! == ticket.id});
   },
   error => {
   
   })
  }
  
  editTicket(ticket){
    this.router.navigate([ticket.id,'edit'], {relativeTo: this.route})
  }

  ticketDetails(ticket){
    this.router.navigate([ticket.id], {relativeTo: this.route})
  }

  nextClick(){
    if(this.currentSelectedPage < this.totalPages-1){
      this.getPageTicket(++this.currentSelectedPage,this.pageSize);
    }  
  }

  previousClick(){
    if(this.currentSelectedPage > 0){
      this.getPageTicket(--this.currentSelectedPage,this.pageSize);
    }  
  }

  getPaginationWithIndex(index: number) {
    this.getPageTicket(index,2);
  }

  changeState(i: number) {
    this.clickedIndex = i;
  }

  somethingChanged(event){
    if(this.searchText != ''){
      this.ticketService.getPageTicketByword(this.currentSelectedPage,this.pageSize,this.searchText).subscribe(data => {
        this.tickets = data.content;
      });
    }
    else {
      this.getPageTicket(this.currentSelectedPage,this.pageSize);
    }
  }

}
