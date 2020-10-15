import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Project } from './project.model';
import { Page } from '../shared/Page'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl +'projects/project/'+ id);
  }

  getProjects() : Observable<Project[]> {
    return this.http.get<Project[]>(environment.apiUrl +'projects');
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(environment.apiUrl +'projects/project', project );
  }
  
  updateProject(project: Project):Observable<Project>{
    return this.http.put<Project>(environment.apiUrl +'projects/project', project );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(environment.apiUrl +'projects/project/'+ id);
  }

  getPageProject(pageNumber: number, pageSize: number): Observable<Page<Project>> {
    let params = new HttpParams();
    params = params.set('page',pageNumber.toString());
    params = params.set('size',pageSize.toString());
    return this.http.get<Page<Project>>(environment.apiUrl +'projects/page', { params: params } );
  }

  getPageProjectByword(pageNumber: number, pageSize: number, word: String) {
    let params = new HttpParams();
    params = params.set('page',pageNumber.toString());
    params = params.set('size',pageSize.toString());
    return this.http.get<Page<Project>>(environment.apiUrl +'projects/'+word , { params: params });
  }

  
}
