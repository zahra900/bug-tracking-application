import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsComponent } from './tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import {TicketsRoutingModule} from './tickets-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [TicketsComponent, TicketListComponent, TicketEditComponent, TicketDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
