import { Component, OnInit } from '@angular/core';
import {CordinatorService} from './cordinator.service';
import { NgForm} from '@angular/forms';
import {Popup} from 'ng2-opd-popup';
import { Router} from '@angular/router';

@Component({
  selector: 'app-annaucement',
  template: `

  <popup>
      <div *ngIf="statusFromSendAnaucement==null">
        <p style="text-align: center;">succesfull post</p>
      </div>
      <div *ngIf="statusFromSendAnaucement!=null">
        <p style="text-align: center;">failed post</p>
      </div>
      
  </popup>
  <div class="row" style="box-shadow: 0 0 10px grey;">
   
  <div class="col-md-12">
   <form action="" class="form-group" #for="ngForm" (ngSubmit)="sendData()" style="margin-top: 4px;">
   <div class="input-group" style="margin-bottom: 3px;">
   <span class="input-group-addon glyphicon glyphicon-envelope"></span>
     <input type="text" class="form-control" [(ngModel)]="anaucementData.title" required placeholder="annoucement title" #id=ngModel name="title">
     
     <span class="input-group-addon glyphicon glyphicon-envelope"></span>
   </div>

     <div class="form-group">
           
           <textarea class="form-control" rows="3" [(ngModel)]="anaucementData.descrption" required name="descrption"#t=ngModel   placeholder="description here....."></textarea>
          
         </div>
     <button class="form-control btn btn-primary" style="color: red" [disabled]="!for.valid" >POST</button>
     
   </form>
   
   </div>
    </div>
    <br/>
    
    <div class="row" style="box-shadow: 0 0 5px grey;">
      <div class="col-md-8 col-md-offset-2" >
      <div style="display: flex">
        <canvas baseChart
                [data]="pieChartData"
                [labels]="pieChartLabels"
                [chartType]="pieChartType"
                (chartClick)="chartClicked($event)"
                ></canvas>
      </div>
        
      </div>
    </div>
  `,
  styles: [`

  :host /deep/ popup button:nth-child(2){
  display:none;
    
  }
  `],
  providers: [CordinatorService]
})
export class AnnaucementComponent implements OnInit {

  constructor(private cservice:CordinatorService,private popup:Popup,private router:Router) { }

  options = {
      header: "status",
      color: "#5cb85c", // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "", // The text on your confirm button 
      cancleBtnContent: "ok", // the text on your cancel button 
      confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
  }
   

 anaucementData={
  title:'',
  descrption:''
}
private statusFromSendAnaucement:any
private userData=JSON.parse(sessionStorage.getItem('userData'))
public id:string=this.userData["employee_id"]

  ngOnInit() {
      this.cservice.viewReceivedConceptNoteOfRejected().subscribe(
      resp=>{
    this.pieChartData[0]=resp.length
      }
        )
  }

  public sendData(){
  this.cservice.sendAnaucement(this.id,this.anaucementData.title,this.anaucementData.descrption).subscribe((response)=>{},
  error=>{this.statusFromSendAnaucement=error}
  )
   this.popup.show(this.options);

}

  public pieChartLabels:string[] = ['RejectedConceptNote', 'SubmitedReport', 'GroupsNoteAssignedSupervisors'];
   public pieChartData:number[] = [10, 0,0];
   public pieChartType:string = 'pie';
  
  // events
  public chartClicked(e:any):void {
  
    if (e.active[0]._index==0) {
      this.router.navigate(['./coordinator',{outlets: { vc:'view-concept-note',ca:null}}])
    }

  }
  
}
