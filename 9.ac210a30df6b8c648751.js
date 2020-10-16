(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{zrcO:function(e,s,t){"use strict";t.r(s),t.d(s,"UsersModule",(function(){return d}));var r=t("ofXK"),i=t("tyNb"),o=t("fXoL");let n=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(s){return new(s||e)},e.\u0275cmp=o.Jb({type:e,selectors:[["app-users"]],decls:1,vars:0,template:function(e,s){1&e&&o.Qb(0,"router-outlet")},directives:[i.f],styles:[""]}),e})();var c=t("3Pt+"),b=t("qCZ/");function u(e,s){if(1&e&&(o.Ub(0,"tr"),o.Ub(1,"td",2),o.rc(2),o.Tb(),o.Ub(3,"td"),o.rc(4),o.Tb(),o.Ub(5,"td"),o.rc(6),o.Tb(),o.Ub(7,"td"),o.rc(8),o.gc(9,"lowercase"),o.Tb(),o.Tb()),2&e){const e=s.$implicit,t=s.index;o.Fb(2),o.sc(t),o.Fb(2),o.sc(e.username),o.Fb(2),o.sc(e.email),o.Fb(2),o.sc(o.hc(9,4,e.role.roleName))}}let l=(()=>{class e{constructor(e){this.userService=e,this.usersList=[]}ngOnInit(){this.subscription=this.userService.usersChanged.subscribe(e=>{this.usersList=e}),console.log("in users component"),this.getUsers()}getUsers(){this.userService.getUsers().then(e=>{this.usersList=e})}}return e.\u0275fac=function(s){return new(s||e)(o.Pb(b.a))},e.\u0275cmp=o.Jb({type:e,selectors:[["app-user-list"]],decls:16,vars:1,consts:[[1,"btn-primary-spacing",2,"margin","auto"],[1,"table","table-bordered"],[1,"hidden"],[4,"ngFor","ngForOf"]],template:function(e,s){1&e&&(o.Ub(0,"h4",0),o.rc(1," Users List"),o.Tb(),o.Ub(2,"div"),o.Ub(3,"table",1),o.Ub(4,"thead"),o.Ub(5,"tr"),o.Ub(6,"th",2),o.rc(7,"Id"),o.Tb(),o.Ub(8,"th"),o.rc(9,"User Name"),o.Tb(),o.Ub(10,"th"),o.rc(11,"Email"),o.Tb(),o.Ub(12,"th"),o.rc(13,"Role"),o.Tb(),o.Tb(),o.Tb(),o.Ub(14,"tbody"),o.qc(15,u,10,6,"tr",3),o.Tb(),o.Tb(),o.Tb()),2&e&&(o.Fb(15),o.jc("ngForOf",s.usersList))},directives:[r.k],pipes:[r.j],styles:[""]}),e})();function a(e,s){if(1&e&&(o.Ub(0,"option",12),o.rc(1),o.gc(2,"lowercase"),o.Tb()),2&e){const e=s.$implicit;o.jc("ngValue",e.id),o.Fb(1),o.sc(o.hc(2,2,e.roleName))}}const p=function(e){return{email:e}};function h(e,s){if(1&e&&(o.Ub(0,"option",12),o.rc(1),o.Tb()),2&e){const e=s.$implicit;o.jc("ngValue",o.kc(2,p,e.email)),o.Fb(1),o.sc(e.username)}}const m=[{path:"",component:n,children:[{path:"roles",component:(()=>{class e{constructor(e,s){this.userService=e,this.fb=s,this.usersList=[],this.users=[],this.rolesList=[],this.emailsList=[]}ngOnInit(){this.usersRole=this.fb.group({user:["",c.s.required],role:this.fb.group({id:["",c.s.required]})}),this.getRolesList(),this.getUsersList()}getUsersList(){return this.userService.getUsers().then(e=>{this.usersList=e}),this.usersList}getRolesList(){this.userService.getRoles().subscribe(e=>{this.rolesList=e})}onSubmit(){this.usersRole.controls.user.value.forEach(e=>{this.users.push(Object.assign({},e,{role:this.usersRole.controls.role.value}))}),this.userService.updateUsersRole(this.users).subscribe(e=>{this.userService.getUsers().then(e=>{this.userService.usersChanged.next(e.slice())})})}}return e.\u0275fac=function(s){return new(s||e)(o.Pb(b.a),o.Pb(c.d))},e.\u0275cmp=o.Jb({type:e,selectors:[["app-manage-role"]],decls:20,vars:3,consts:[[1,"container"],[1,"row"],[1,"col-sm"],[3,"formGroup","ngSubmit"],["formGroupName","role",1,"form-group"],["for","roles"],["id","roles","formControlName","id","title","Choose one of the following...",1,"form-control","custom-select"],[3,"ngValue",4,"ngFor","ngForOf"],[1,"form-group"],["for","inputState"],["id","inputState","formControlName","user","multiple","",1,"form-control","show-tick"],["type","submit",1,"btn","btn-success"],[3,"ngValue"]],template:function(e,s){1&e&&(o.Ub(0,"div",0),o.Ub(1,"div",1),o.Ub(2,"div",2),o.Qb(3,"app-user-list"),o.Tb(),o.Tb(),o.Ub(4,"div",1),o.Ub(5,"form",3),o.bc("ngSubmit",(function(){return s.onSubmit()})),o.Ub(6,"div",2),o.Ub(7,"div",4),o.Ub(8,"label",5),o.rc(9,"Roles"),o.Tb(),o.Ub(10,"select",6),o.qc(11,a,3,4,"option",7),o.Tb(),o.Tb(),o.Tb(),o.Ub(12,"div",2),o.Ub(13,"div",8),o.Ub(14,"label",9),o.rc(15,"Users"),o.Tb(),o.Ub(16,"select",10),o.qc(17,h,2,4,"option",7),o.Tb(),o.Tb(),o.Tb(),o.Ub(18,"button",11),o.rc(19,"Submit"),o.Tb(),o.Tb(),o.Tb(),o.Tb()),2&e&&(o.Fb(5),o.jc("formGroup",s.usersRole),o.Fb(6),o.jc("ngForOf",s.rolesList),o.Fb(6),o.jc("ngForOf",s.usersList))},directives:[l,c.u,c.l,c.h,c.i,c.q,c.k,c.f,r.k,c.r,c.n,c.t],pipes:[r.j],styles:[".container[_ngcontent-%COMP%]{margin-top:50px}"]}),e})()}]}];let f=(()=>{class e{}return e.\u0275mod=o.Nb({type:e}),e.\u0275inj=o.Mb({factory:function(s){return new(s||e)},imports:[[i.e.forChild(m)],i.e]}),e})(),d=(()=>{class e{}return e.\u0275mod=o.Nb({type:e}),e.\u0275inj=o.Mb({factory:function(s){return new(s||e)},imports:[[r.b,i.e,f,c.j,c.o]]}),e})()}}]);