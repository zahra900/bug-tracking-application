import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Ticket } from './ticket.model';
import { Page } from '../shared/Page';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTickets() : Observable<Ticket[]> {
    return this.http.get<Ticket[]>(environment.apiUrl +'bugs');
  }

  createTicket(ticket: Ticket) : Observable<Ticket> {
    return this.http.post<Ticket>(environment.apiUrl +'bugs/bug', ticket );
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl +'bugs/bug/'+ id);
  }
 
  getPageTicket(pageNumber: number, pageSize: number): Observable<Page<Ticket>> {
    let params = new HttpParams();
    params = params.set('page',pageNumber.toString());
    params = params.set('size',pageSize.toString());
    return this.http.get<Page<Ticket>>(environment.apiUrl +'bugs/page', { params: params } );
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(environment.apiUrl +'bugs/bug/'+ id);
  }

  updateTicket(bug: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(environment.apiUrl +'bugs/bug/', bug);
  }

  getPageTicketByword(pageNumber: number, pageSize: number, word: String) {
    let params = new HttpParams();
    params = params.set('page',pageNumber.toString());
    params = params.set('size',pageSize.toString());
    return this.http.get<Page<Ticket>>(environment.apiUrl +'bugs/'+word , { params: params });
  }
  
  addComment(comment: any):  Observable<any> {
    return this.http.post<any>(environment.apiUrl +'comments/comment/', comment);
  }

  getComment(id: number): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl +'comments/comment/'+ id );
  }

  getCommentList(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl +'comments');
  }

  deleteComment(id: number) {
    return this.http.delete(environment.apiUrl +'comments/comment/'+ id );
  }

  async uploadFile(file: FormData): Promise<HttpEvent<any>> {
    return await this.http.post<HttpEvent<any>>(environment.apiUrl +'file/upload/', file).toPromise();
  }

}
