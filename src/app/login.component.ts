import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from './login.service';
import { Router} from '@angular/router';
import { NgForm} from '@angular/forms';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginServiceService]

})

export class LoginComponent implements OnInit {


  constructor( private loginservice:LoginServiceService,private router:Router) {

   }
user={
	id:'',
	pass:'',
}

private loginStatus:any;
  ngOnInit() {
  }
 
getUser(){

	this.loginservice.getUser(this.user.id,this.user.pass).subscribe(
    response=>{
      
      if (response[0]['role']=='student') {
        
        
        if (localStorage.getItem(response[0]['student_reg_no'])==null) {
          this.router.navigate(['./student',{outlets: { p:'profile'}}]);
          localStorage.setItem(response[0]['student_reg_no'],'1')
        }else{
          this.router.navigate(['./student',{outlets: { an:'annaucement'}}])
        }
          
        // localStorage.setItem('userData',JSON.stringify(response[0]))
        sessionStorage.setItem('userData',JSON.stringify(response[0]))


        return
        }else if(response[0]['role']=='cordinaor'){
          
          this.router.navigate(['./coordinator',{outlets: { ca:'annaucement'}}]);
        sessionStorage.setItem('userData',JSON.stringify(response[0]))
        return

        }else if(response[0]['role']=='supervisor'){
          
          this.router.navigate(['./supervisor',{outlets: { sp:'profile'}}]);
        sessionStorage.setItem('userData',JSON.stringify(response[0]))
        return

        }
      },
      error=>{
        console.log(error)
        alert("sorry u failed to login")

      }

    )
 
  
}

}


