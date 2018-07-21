import { Component, OnInit } from '@angular/core';
import {SupervisorService} from '../supervisor.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
  providers:[SupervisorService]

})
export class BarComponent implements OnInit {

  constructor(private service:SupervisorService) { }
private userData:any=JSON.parse( sessionStorage.getItem('userData'));
private picUrl:string=this.userData["profile_picture"]
private sname:string=this.userData["name"];
private unreaded:number;
  ngOnInit() {
  	this.service.UnreadedReadedMessages().subscribe(
  		resp=>{this.unreaded=resp.length}
        
  		)
  }

  

}
