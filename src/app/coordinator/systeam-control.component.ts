import { Component, OnInit } from '@angular/core';
import {CordinatorService} from './cordinator.service';
import { NgForm} from '@angular/forms';



@Component({
  selector: 'app-systeam-control',
  template: `
   <div class="container-fluid">
     <div class="row">
       <div class="col-md-12 col-xs-12 col-sm-12">
        <ul class="list-group">
           <li class="list-group-item" style="background-color: #dfe3ee;">conceptNote submissions control <span class="pull-right"> curent-state :&emsp; <b *ngIf="scs">allowed</b><b *ngIf="!scs">not allowed</b></span></li>
           <li class="list-group-item">allow submission 
             <span class="pull-right">
              <button class="btn-primary" (click)="alowSubmisionOfconceptNote()">yes</button>&emsp; <button class="btn-danger" (click)="NotealowSubmisionOfconceptNote()">no</button>
            </span>
         </li>
         </ul>

       </div>
     </div>
     <!-- alow reports submission -->
     <div class="row">
       <div class="col-md-12 col-xs-12 col-sm-12">
         <ul class="list-group">
           <li class="list-group-item" style="background-color: #dfe3ee;">controls of reports submissions <span class="pull-right" style="font-style: italic;">current state</span></li>
           <li class="list-group-item">
           <form #va="ngForm" (ngSubmit)="reports()">
             <div class="checkbox">
               <label><input type="checkbox" [(ngModel)]="s1p" name="s1p" value="true">semister 1 progress</label>
               <span class="pull-right ita" *ngIf="s1ps">allowed </span>
               <span class="pull-right ita" *ngIf="!s1ps">not allowed </span>
             </div>
             <div class="checkbox">
               <label><input type="checkbox" [(ngModel)]="s1f" name="s1f" value="true">semister 1 final</label>
               <span class="pull-right ita" *ngIf="s1fs">allowed </span>
               <span class="pull-right ita" *ngIf="!s1fs">not allowed </span>
             </div>
             <div class="checkbox ">
               <label><input type="checkbox" [(ngModel)]="s2p" name="s1p" value="true" >semister 2 progress</label>
               <span class="pull-right ita" *ngIf="s2ps">allowed </span>
               <span class="pull-right ita" *ngIf="!s2ps">not allowed </span>
             </div>
             <div class="checkbox ">
               <label><input type="checkbox" [(ngModel)]="s2f" name="s2f" value="true" >semister 2 final</label>
               <span class="pull-right ita" *ngIf="s2fs">allowed </span>
               <span class="pull-right ita" *ngIf="!s2fs">not allowed </span>
             </div>
             <button class="btn-primary form-control">alow checked to be submited</button>
           </form>
           </li>
         </ul>

       </div>
     </div>
     <!-- alow reports submission -->

   </div>
  `,
  styles: [
    `
    .ita{
      font-style:italic;
    }

    `

  ],
  providers:[CordinatorService]
})
export class SysteamControlComponent implements OnInit {
private s1p:boolean=false;
private s1f:boolean=false;
private s2p:boolean=false;
private s2f:boolean =false;
private s1ps:boolean=false;
private s1fs:boolean=false;
private s2ps:boolean=false;
private s2fs:boolean =false;
private scs:boolean =false;
  constructor(private service:CordinatorService) { }

  ngOnInit() {
    this.service.getCurrentState().subscribe(
          resp=>{
            
            this.s1ps=resp[0].sem1progress
            this.s1fs=resp[0].sem1final
            this.s2ps=resp[0].sem2progress
            this.s2fs=resp[0].sem2final
            this.scs=resp[0].submitConceptNote
            
          }
      )
  }


  alowSubmisionOfconceptNote(){
   this.service.updateConceptNoteControls(true,1).subscribe(
        resp=>{alert("succesfull allow Submission")}
     )
  }
  NotealowSubmisionOfconceptNote(){
  this.service.updateConceptNoteControls(false,1).subscribe(
       resp=>{alert("succesfull block Submission")}
    )
  }
private reports(){
  this.service.updateReportControls(this.s1p,this.s1f,this.s2p,this.s2f,).subscribe(
    resp=>{alert("alow semister 1 progress submission to   "+this.s1p
          +"\n \n alow semister 1 final submission to  "+this.s1f
          +"\n \n alow semister 2 progress submission to  "+this.s2p
          +"\n \n alow semister 1 final submission to  "+this.s2f

      )}
    )
}

}
