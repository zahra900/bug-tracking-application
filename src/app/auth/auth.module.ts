import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthComponent } from './auth.component';
import {AuthInterceptor} from  './auth-interceptor'


@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent}])   
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
]

})
export class AuthModule {}