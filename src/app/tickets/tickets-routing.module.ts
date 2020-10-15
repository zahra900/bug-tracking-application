import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TicketsComponent} from './tickets.component';
import {TicketListComponent} from './ticket-list/ticket-list.component'
import {TicketEditComponent} from './ticket-edit/ticket-edit.component'
import {TicketDetailsComponent} from './ticket-details/ticket-details.component'

const routes: Routes = [
  {
    path: '', component: TicketsComponent,
    children: [
      { path: '', component: TicketListComponent },
      { path: ':id/edit', component: TicketEditComponent },
      { path: 'new', component: TicketEditComponent},
      { path: ':id', component: TicketDetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}