  import { Component, OnInit } from '@angular/core';
  import {StudentService} from './student.service';
  import { DatePipe } from '@angular/common';
  

  @Component({
    selector: 'app-dashboard',
    template: `
  <div class="container-fluid">
  <div class="row">
  	<div class="col-md-6 col-md-offset-3 col-xs-12 col-sm-12 tile" >
  		<h3><img src="./../../assets/systemImages/annaucement.jpg" class="img-thumbnail" alt=""></h3>
  	</div>
  </div>
  <!-- row for message datas -->
 <div *ngFor="let item of data,let i=index">
  	<div class="row" style="box-shadow: 0 0 10px grey;margin-bottom: 8px;">
        <div *ngIf="item.coordinator_employee_id.profile_picture==null" >
  	     <div class="col-md-2 col-xs-2 col-sm-2 visible-lg img-thumbnail"   style="width: 100px; height: 70px; border:  8px groove  white; background-color: blue;background-color:white;background-size: 100%;">
           
          </div>
          </div>
                <div *ngIf="item.coordinator_employee_id.profile_picture!=null">
                 <div class="col-md-2 col-xs-2 col-sm-2 visible-lg img-thumbnail" [ngStyle]="{ 'background-image': 'url(' + item.coordinator_employee_id.profile_picture + ')','height': '70px','background-repeat':'no-repeat','background-size':'cover'}"  style="width: 100px; background-color: white; border: 8px white groove;">
                   
                  </div>
                  </div>
         <div class="col-md-10 col-xs-12 col-sm-12" style="">
         <h5 style="font-size: 12px;"> <span style="font-style: italic; " class="pull-left" ><b> {{item.coordinator_employee_id.name}}</b></span><span  class="pull-right"> <b>{{item.creted_at | date :'shortDate'}}</b></span></h5>
         
         <hr>
         <h4 style="text-align: center; text-transform: uppercase; font-size: 14px;text-decoration: underline;"><a type="button" data-toggle="collapse" [attr.data-target]="'#'+i" >{{item.title}}</a></h4>
         <p [attr.id]="i" class="collapse">{{item.description
}}
         
       </p>
           
         </div>
  	</div>
</div>
    <!-- row for message datas -->

    
  </div>

    `,
    styles: [
    `
  
    .tile h3 img{
    border:blue 1px groove;
    width: 300px;
    
    max-height: 100%;
    
    }
    .tile h3{
    	background-color: blue;
      height: 35px;

    }

    `

    ],
    providers: [StudentService,DatePipe]
  })
  export class DashboardComponent implements OnInit {

    constructor(private stService:StudentService) { }
      private data:any;

    ngOnInit() {
      this.stService.getAnaucements().subscribe(
      (response)=>{
        this.data=response;
        
      }
        );
      
      }
    

  }
