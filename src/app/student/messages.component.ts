import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {StudentService} from './student.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-messages',
  template: `
  <div *ngIf="!hide" style="text-align: center;" class="alert alert-info">
    <p>sorry can't acces the service without submit ConceptNote</p>
  </div>
  
   <div class="row" *ngIf="hide">
   <!-- write message -->
     <div class="col-md-5 write " >
          
          <div style="background-color: #dfe3ee;"class="status" >
          <h4 style="text-align: center;padding-top: 5px;height: 30px;"  >message to supervisor</h4>
          
          </div>
     
       <form class="" style="margin-top: 2px;"  #for="ngForm" (ngSubmit)="sendMessage(for.value)"  >
           <div class="form-group">
             <textarea class="form-control" rows="5" placeholder="message to supervisor ..." name="messag" #id=ngModel required [(ngModel)]="Studentmessage" id="comment"></textarea>
           </div>
           <button type="submit" class="btn btn-primary form-control" style="text-align: center;margin-bottom: 5px;color: red;" [disabled]="!for.valid">send</button>
         </form>
         
     </div>

     <!-- write message -->
        <!-- free area -->
        <div class="col-md-1"></div>
        <!-- free area -->
     <!-- see message -->
     <div class="col-md-6">
        <!-- heading  -->

         <div style="background-color: #dfe3ee;"class="status" >
            <h4 style="text-align: center;padding-top: 5px;height: 30px;overflow: auto;" >message from supervisor &emsp; <b style="text-decoration: underline; font-style: italic;font-size: 14px;">{{supervisorname}}</b></h4>
            
            
        </div>
        <!-- heading  -->
        <div *ngFor="let item of message,let i=index">
          <div style="box-shadow: 0 0 2px 2px grey;">
            <h5>
              <a type="button" class="badge badge-pill" style="text-align: left;font-style: italic;" data-toggle="collapse" [attr.data-target]="'#'+i" >view
              </a>
              

              <b class="pull-right" style="text-align: right;">{{item.creted_at | date : 'shortDate'}}</b>

              
            </h5>
            <p [attr.id]="i" class="collapse">{{item.message_from_supervisor}}</p>
            
            
          </div>
        </div>
        
    </div>
     <!-- see message -->
   </div>
  `,
  styles: [
`

.write{
  box-shadow: 0 0 10px grey;
}
.status{
  box-shadow: 0 10px 5px 1px #dfe3ee;
  box-shadow: 0 7px 0 -5px #8A42FF;
  box-shadow: 0 6px 0 -4px #8A42FF;
}


`
  ],
  providers:[StudentService]
})
export class MessagesComponent implements OnInit {
  private hide:boolean=true;
private message:any;
private Studentmessage:any;
private supervisorname:string;

  constructor(private service:StudentService) { }

  ngOnInit() {
    if (this.service.groupno==null) {
       this.hide=false
       return
     } 
     

    this.service.getSupervisorIds().subscribe(
  resp=>{
    
    if (resp.supervisor_employee_id==null) {
      this.service.getSupervisorName(resp.proposed_supervisor).subscribe(
          res=>{
            
            this.supervisorname=res.name
            
          }
        )
    }
    if (resp.supervisor_employee_id!=null) {
      this.service.getSupervisorName(resp.supervisor_employee_id).subscribe(
          res=>{
            this.supervisorname=res.name
            
            
          }
        )
    }
  }
      )
    this.service.getSupervisorMessages().subscribe(
resp=>{
  this.message=resp
  console.log(this.message)
  
}
      )
  }
  sendMessage(data:any){

this.service.getStudentTitle().subscribe(
resp=>{
  this.mi=resp.title
this.service.getSupervisorIds().subscribe(resp=>{

  if (resp.supervisor_employee_id==null) {
  this.service.messageToSupervisor(this.mi,data.messag,resp.proposed_supervisor).subscribe(
resp=>{alert('succesful send to proposedSupervisor')
}
    )
          
        }else{
            this.service.messageToSupervisor(this.mi,data.messag,resp.supervisor_employee_id).subscribe(
          resp=>{alert('succesful send to supervisor')
          }
              )

        }
  

}
)
  
  
}
  )

}
private mi:any;

}


