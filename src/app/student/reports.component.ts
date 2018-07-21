import { Component, OnInit } from '@angular/core';
import {StudentService} from './student.service';


@Component({
  selector: 'app-reports',
  template: `
<!-- see if has a group -->

<div *ngIf="hasNoGroup">

 <ul class="list-group" *ngIf="alowS1p" >
   <li class="list-group-item" style="background-color: #f7f7f7;">semister one progress</li>
   <li class="list-group-item" *ngIf="sem1progressUrl!=null"><a href="{{sem1progressUrl}}" target="_blank">view submited report</a> </li>
   <li class="list-group-item" >
     <span>
      <form enctype="multipart//form-data">
       <input type="file" (change)="getRFiles($event)" required accept="application/pdf">
       </form>
     </span>
    <span class="pull-right" style="display: block;margin-top: -20px;">
      <button class="btn-primary "(click)="sem1progress()" *ngIf="sem1progressUrl==null">submit</button>
      <button class="btn-danger "  (click)="sem1progress()" *ngIf="sem1progressUrl!=null">resubmit</button>
     </span>

   </li> 
   
 </ul>


 <ul class="list-group" *ngIf="alowS1f">
   <li class="list-group-item" style="background-color: #f7f7f7;">semister one final</li>
   <li class="list-group-item" *ngIf="sem1finalUrl!=null"><a href="{{sem1finalUrl}}" target="_blank">view submited report</a> </li>
   <li class="list-group-item" >
    <span>
      <form enctype="multipart//form-data">
      <input type="file" (change)="getRFiles($event)" accept="application/pdf">

      </form>
    </span>
    <span class="pull-right" style="display: block;margin-top: -20px;">
      <button class="btn-primary " (click)="sem1final()" *ngIf="sem1finalUrl==null">submit</button>
      <button class="btn-danger "  (click)="sem1final()" *ngIf="sem1finalUrl!=null">resubmit</button>
    </span>
  </li> 
   
 </ul>



 <ul class="list-group" *ngIf="alowS2p" >
   <li class="list-group-item" style="background-color: #f7f7f7;">semister two progress</li>
   <li class="list-group-item" *ngIf="sem2progressUrl!=null"><a href="{{sem2progressUrl}}" target="_blank">view submited report</a> </li>
   <li class="list-group-item" >
    <span>
      <form enctype="multipart//form-data">
      <input type="file" (change)="getRFiles($event)" accept="application/pdf">

      </form>
    </span>
    <span class="pull-right" style="display: block;margin-top: -20px;">
      <button class="btn-primary "(click)="sem2progress()" *ngIf="sem2progressUrl==null">submit</button>
      <button class="btn-danger "  (click)="sem1final()" *ngIf="sem2progressUrl!=null">resubmit</button>
    </span>
  </li> 
   
 </ul>



 <ul class="list-group" *ngIf="alowS2f" >
   <li class="list-group-item" style="background-color: #f7f7f7;">semister two final</li>
<li class="list-group-item" *ngIf="sem2finalUrl!=null"><a href="{{sem2finalUrl}}" target="_blank">view submited report</a> </li>
   <li class="list-group-item" >
    <span>
      <form enctype="multipart//form-data">
      <input type="file" (change)="getRFiles($event)" accept="application/pdf">

      </form>
    </span>
    <span class="pull-right" style="display: block;margin-top: -20px;">
      <button class="btn-primary "(click)="sem2final()" *ngIf="sem2finalUrl==null">submit</button>
      <button class="btn-danger "  (click)="sem2final()" *ngIf="sem2finalUrl!=null">resubmit</button>
    </span>
  </li> 
   
 </ul>
 
</div>
<!-- see if has a group -->

<!-- has no group -->
<div *ngIf="!hasNoGroup" >
 <h4 class="alert alert-danger" style="text-align: center;">you haven't enrolled to the service</h4>
</div>
<!-- has no group -->
<!-- supervisor has not allowed services -->

<div *ngIf="sem1progressUrl">
  <table class="table table-bordered">
    <caption style="text-align: center;background-color: #DFE3EE;color: black;font-size: 16px;">submited reports</caption>
    <thead>
      <tr *ngIf="sem1progressUrl">
        <th>semister1ProgressReport</th>
        <th>semister1FinalReport</th>
        <th>semister2ProgressReport</th>
        <th>semister2FinalReport</th>
      
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <a href="{{sem1progressUrl}}" target="_blank">view report</a></td>
        <td >
          <a href="{{sem1finalUrl}}" target="_blank" *ngIf="sem1finalUrl">view report</a></td>
        <td >
          <a href="{{sem2progressUrl}}" target="_blank" *ngIf="sem2progressUrl">view report</a></td>
        <td >
          <a href="{{sem2finalUrl}}" target="_blank" *ngIf="sem2finalUrl">view report</a></td>
      </tr>
    </tbody>
  </table>
</div>
<div *ngIf="!alowS1p && !alowS1f && !alowS2p && !alowS2f">
  
  <h4 class="alert alert-danger" style="text-align: center;" >cordinator has not allow the service yet</h4>
  
</div>
<!-- supervisor has not allowed services -->

  `,
  styles: [
  `
 
  
  `
  ],
  providers:[StudentService]
})
export class ReportsComponent implements OnInit {
private alowS1p:boolean=false;
private alowS1f:boolean=false;
private alowS2p:boolean=false;
private alowS2f:boolean=false;
private sem1progressUrl:string;
private sem1finalUrl:string;
private sem2progressUrl:string;
private sem2finalUrl:string;
private hasNoGroup:boolean=true;
  constructor(private service:StudentService) { }
  newfiles : FileList; 
      getRFiles(event){ 
          this.newfiles = event.target.files; 
      } 
  ngOnInit() {

    if (this.service.groupno!=null) {
      this.service.seeReports().subscribe(

        resp=>{
          console.log(resp)
          this.sem1finalUrl=resp[0].semister1_final,
          this.sem2finalUrl=resp[0].semister2_Final,
          this.sem1progressUrl=resp[0].semister1_progress,
          this.sem2progressUrl=resp[0].semister2_progress

        }
        )
    }else if (this.service.groupno==null) {
      this.hasNoGroup=false
    }{
      
      
    }
    
      
    
   this.service.getStatusOfReportsSubmission().subscribe(
    resp=>{
   this.alowS1f= resp[0].sem1final;
     this.alowS1p=resp[0].sem1progress;
      this.alowS2f=resp[0].sem2final;
      this.alowS2p=resp[0].sem2progress;
    }
     )
  }

  sem1progress(){
     this.service.updateSemister1Progress(this.newfiles[0]).subscribe(
        resp=>{alert("succesful send "+this.newfiles[0].name);console.log(this.sem2progressUrl)}
        )
  }
    sem2final(){
      this.service.updateSemister2Final(this.newfiles[0]).subscribe(
        resp=>{alert("succesful send "+this.newfiles[0].name)}
        )
    }

    sem1final(){
      this.service.updateSemister1Final(this.newfiles[0]).subscribe(
        resp=>{alert("succesful send "+this.newfiles[0].name)}
        )
    }
    sem2progress(){
      this.service.updateSemister2Progress(this.newfiles[0]).subscribe(
        resp=>{alert("succesful send "+this.newfiles[0].name)}
        )
    }
}
