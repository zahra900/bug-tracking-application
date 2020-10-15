import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import {AuthService} from './auth.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  returnUrl: string;
  submitted: boolean;
  loading: boolean;
  error = '';


  constructor(private fb: FormBuilder,private router: Router, private route:ActivatedRoute, private authService: AuthService) { 
    if(this.authService.currentUserValue){
      this.router.navigate['/']
    }
  }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get getLoginForm() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
     var params =  "username="+this.getLoginForm.email.value+"&password="+this.getLoginForm.password.value+"&grant_type="+"password";
    this.authService.login(params)
    .pipe(first())
    .subscribe(data => {
      console.log('returnUrl',this.returnUrl)
      this.router.navigate([this.returnUrl]);
    },
    error => {
      this.error = error;
      this.loading = false;
    })
    
  }
    
  }
   

   


