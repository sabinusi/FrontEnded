import { Component, OnInit } from '@angular/core';
import {StudentService} from '../student.service';



@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
  providers:[StudentService]
  
  
   
})
export class HeadComponent implements OnInit {
	private data:string;
private userData:any=JSON.parse( sessionStorage.getItem('userData'));
private picUrl:string=this.userData["profile_picture"]
private sname:string=this.userData["firstname"];
private messageLength:any;
  constructor(private service:StudentService) {
  	this.service.getSupervisorMessages().subscribe(
resp=>{this.messageLength=resp.length
	
 }
  		)
   
 
   }

  ngOnInit() {
   
   
    

   
 }
 

  

}
