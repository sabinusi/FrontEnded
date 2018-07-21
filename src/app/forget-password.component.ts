import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginServiceService} from './login.service';


@Component({
  selector: 'app-forget-password',
  template: `
   <div class="container">
       <div class="row">
           <div class="col-sm-6 col-md-4 col-md-offset-4">
               <h1 class="text-center login-title">RECOVER PASSWORD FROM (FYPMS)</h1>
               <div class="account-wall">
                   <img class="profile-img" src="./assets/systemImages/forgetPassword.png" 
                     style="height: 110px;width: 100px"  alt=""> 
                    
                   <form class="form-signin" #form="ngForm" (ngSubmit)="restpassword(form.value)">
               
                   <input type="text" class="form-control" placeholder="id number" required ngModel name="id">
                   <button [disabled]="!form.valid" class="btn btn-lg btn-danger btn-block" type="submit">
                       Recover My Password</button>
                   
                   </form>
               </div>
              
                           
           </div>
       </div>
   </div>

  `,
  styles: [`
  .form-signin
  {
      max-width: 330px;
      padding: 15px;
      margin: 0 auto;
  }
  .form-signin .form-signin-heading, .form-signin .checkbox
  {
      margin-bottom: 10px;
  }
  .form-signin .checkbox
  {
      font-weight: normal;
  }
  .form-signin .form-control
  {
      position: relative;
      font-size: 16px;
      height: auto;
      padding: 10px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
  }
  .form-signin .form-control:focus
  {
      z-index: 2;
  }
  .form-signin input[type="text"]
  {
      margin-bottom: 3px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom:  groove blue 1px;
  }
  .form-signin input[type="password"]
  {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-bottom:  groove blue 2px;
  }
  .account-wall
  {
      margin-top: 20px;
      padding: 40px 0px 20px 0px;
      background-color: #f7f7f7;
      -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }
  .login-title
  {
      color: #555;
      font-size: 18px;
      font-weight: 400;
      display: block;
  }
  .profile-img
  {
      width: 100px;
      height: 100px;
      margin: 0 auto 10px;
      display: block;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
  }
  .need-help
  {
      margin-top: 10px;
  }
  .new-account
  {
      display: block;
      margin-top: 10px;
  }

  `],
  providers:[LoginServiceService]
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private service:LoginServiceService) { }

  ngOnInit() {

  }
  restpassword(data:any){
  this.service.recoverPassword(data.id).subscribe(
    resp=>{
      
      if (resp[0]['role']=='student') {
         this.service.returnEmail(data.id).subscribe(
           resp=>{
             
             alert('password has recorved to ...'+resp[0]['email'].substring(resp[0]['email'].length-17,resp[0]['email'].length))
           }
           )
       } 
    },
    error=>{alert('failed')}
    )
  
  }

}
