import { Component, OnInit,ViewChild } from '@angular/core';
import {SupervisorService} from './supervisor.service';
import { Router} from '@angular/router';
import {Popup} from 'ng2-opd-popup';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-supervisor-profile',
  template: `
  <hr>
   <div class="row">
     
     <div class="col-md-7" style="height: 368px;box-shadow: 0 0 10px grey">
     
     <div style="background-color: #dfe3ee; text-align: center;"class="status" >
     <h4 style=" display: inline;" >
     most recently received</h4>
     <hr>
     </div>
     

       <div style="display: block" >
         <canvas baseChart style="height: 280px;" 
                     [data]="doughnutChartData"
                     [labels]="doughnutChartLabels"
                     [options]="doughnutChartDataOptions"
                     [chartType]="doughnutChartType"
                     (chartClick)="chartClicked($event)"
                     
                     ></canvas>
       </div>
     
   


     </div>
     <div class="col-md-1"></div>
     <div class="col-md-4" style="box-shadow: 0 0 10px grey;">
      <ul class="list-group">
        <li class="list-group-item" style="background-color: #dfe3ee;text-align: center;">MY PROFILE</li>
        <li class="list-group-item" style="text-align: center;">
          <img src="./assets/systemImages/st.jpg" class="center-block img-rounded" width="100" height="100" *ngIf="!picUrl" alt="" (click)="imageClick()">
          <img src="{{picUrl}}" alt="" class="center-block "  width="100" height="100" *ngIf="picUrl" (click)="imageClick()">
          </li>
          
          <table class="table-bordered" width="100%" style="text-align: center;">
            
              <tr>
              <td><p>name</p></td>
              <td>
                <p class="nam" *ngIf="!showForm">{{name}}</p>
                <form action="" style="display: inline-flex;" #mi="ngForm" (ngSubmit)="updateName(mi.value)" *ngIf="showForm">
                  <input type="text"   required="" placeholder="{{name}}" name="firstname" class="bo inp" ngModel><span><button type="submit" class="bo inp" >UPDATE</button></span>
                </form>
                
              </td>
              </tr>
              
              <tr>
                <td><p>email</p></td>
                <td>
                  <p class="nam"  *ngIf="!showForm">{{email}}</p>
                  
                  <form #f="ngForm" (ngSubmit)="updateMail(f.value)" style="display: inline-flex;" *ngIf="showForm">
                     
                    <input type="email" class="bo inp"  placeholder="{{email}}" name="email" required ngModel >
                    <button [disabled]="!f.valid" class="bo inp" type="submit" >UPDATE</button>
                  </form>
                </td>
              </tr>
              <tr>
                <td><p>phone number</p></td>
                <td>
                  <p class="nam"  *ngIf="!showForm">{{phoneNO}}</p>
                  
                  <form #f="ngForm" (ngSubmit)="updatePhone(f.value)" style="display: inline-flex;" *ngIf="showForm">
                     
                    <input type="phone" class="bo inp"  placeholder="{{phoneNO}}" name="phoneN" required ngModel >
                    <button [disabled]="!f.valid" class="bo inp" type="submit" >UPDATE</button>
                  </form>
                </td>
              </tr>
            <tr>
              <td>
                <p>experties</p>
              </td>
              <td>
             
               <p class="nam"   *ngIf="!showForm" >{{experties}}</p>
               
               <form #f="ngForm" (ngSubmit)="updateExpert(f.value)" style="display: inline-flex;" *ngIf="showForm">
                  
                 <input type="text" class="bo inp"  placeholder="{{experties}}" name="expert" required ngModel >
                 <button [disabled]="!f.valid" class="bo inp" type="submit" >UPDATE</button>
               </form>
             
            </td>
          </tr>
            <tr>
              <td>
                <p>officeNumber</p>
              </td>
              <td>
             
               <p class="nam"    *ngIf="!showForm" >{{officeNo}}</p>
               
               <form #f="ngForm" (ngSubmit)="updateOfficeNumber(f.value)" style="display: inline-flex;" *ngIf="showForm">
                  
                 <input type="text" class="bo inp"  placeholder="{{officeNo}}" name="officeNo" required ngModel >
                 <button [disabled]="!f.valid" class="bo inp" type="submit" >UPDATE</button>
               </form>
             
            </td>
          </tr>
            
          </table>
        
        <li class="list-group-item">
          <a (click)="changePass()"> <i>change password?</i></a> 
          <img class="pull-right" src="./assets/systemImages/pen.jpg" width="50" height="18" alt="edit" (click)="changeDisplay()">

        </li>
      </ul>
     </div>
   </div> 
   <popup  #popup1 (confirmClick)="imageUpdate()">
       <form enctype="multipart//form-data">
        <input type="file" (change)="getRFiles($event)" required accept="image/*">
        </form>
   </popup>
    
   <popup  #popup2 class="s">

       <form  #fo="ngForm" (ngSubmit)="updatePass(fo.value)" style="box-shadow: 0 0 5px 5px grey;">


       <input type="password" placeholder="new-password" class="form-control" required style="margin-bottom: 5px;" name="firstpass" #first="ngModel" ngModel>
       <input type="password" class="form-control" placeholder="retype-new-password" required name="" style="margin-bottom: 3px;" name="secondpass"  #second="ngModel" ngModel >
       
       
       <button class="btn-success form-control" style="color: red;margin-top: 20px;" [disabled]="!fo.valid" type="submit" >update password</button>
        </form>
   </popup>
   <hr>
  `,
  styles: [
`
.status{
  box-shadow: 0 1px 1px #dfe3ee;
  box-shadow: 0 9px 0 -7px #dfe3ee;
  box-shadow: 0 8px 0 -4px #dfe3ee;
}
 .bo{
    border: 5px groove white;
  }
 
  .inp{
    
    text-align: center;
  }
  td{
  overflow: auto ;
  }
`

  ],
  providers:[SupervisorService]
})
export class SupervisorProfileComponent implements OnInit {
   @ViewChild('popup1') popup1: Popup;
   @ViewChild('popup2') popup2: Popup;
  private userData:any=JSON.parse( sessionStorage.getItem('userData'));
  private picUrl:string=this.userData["profile_picture"]
  private name:string=this.userData["name"];
  private email:string=this.userData["email"];
  private phoneNO:string=this.userData["phone_number"];
  private experties:string=this.userData["experties"];
  private officeNo:string=this.userData["ofice_number"];
  private showForm:boolean=false;

  constructor(private service:SupervisorService,private router:Router,private popup:Popup) { }
  private received:number;
  private unreded:number;

  ngOnInit() {

    this.service.UnreadedReadedMessages().subscribe(
      resp=>{

        this.doughnutChartData[2]=resp.length
      }

      )
    this.service.viewReceivedConceptNoteOfWaiting().subscribe(
    resp=>{
  this.doughnutChartData[0]=resp.length
    }
      )
    
    
  }
  
  public doughnutChartLabels:string[] = ['RECEIVED-CONCEPTNOTE', 'GROUPS ASSIGNED-TO', 'RECEIVED MESSAGES','SUBMITED REPORTS'];
  public doughnutChartData:number[] = [1, 0, 1,0];
  public doughnutChartType:string = 'doughnut';
  
  // events
  public chartClicked(e:any):void {
 
    if (e.active[0]._index==0) {
      this.router.navigate(['./supervisor',{outlets: { rc:'received-concept',sp:null}}])
    }
    if (e.active[0]._index==2) {
      this.router.navigate(['./supervisor',{outlets: { m:'messages',sp:null}}])
    }

  }
  
  
  public doughnutChartDataOptions: any = {
    responsive: true,
    maintainAspectRatio: false
}
 newfiles : FileList; 
      getRFiles(event){ 
          this.newfiles = event.target.files; 
      } 
changePass(){
     this.popup.options.header="change my password"
     this.popup.options.confirmBtnContent="applyChanges"
     this.popup.options.cancleBtnClass="btn btn-danger"
     this.popup2.show()
   }
   imageClick(){

     this.popup.options.header='change profile image'
      this.popup.options.confirmBtnContent="update"


   this.popup1.show()
   }
   changeDisplay(){
     if (this.showForm==true) {
       this.showForm=false;
        return
     }
     if (this.showForm==false) {
       this.showForm=true;
       return

     }
   }
   imageUpdate(){
     if (this.newfiles==undefined) {
       alert('please choose file image')
       return
     }
     this.service.updateProfileImage(this.newfiles[0]).subscribe(
       resp=>{
         alert('succesfull upadated')
         this.service.refreshSupervisorDetail().subscribe(
           resp=>{
             sessionStorage.clear()
           sessionStorage.setItem('userData',JSON.stringify(resp[0]))
           })
       }
       )

     this.popup1.hide()
   }
     updatePass(data){
     if(data.firstpass!=data.secondpass){
       alert('failed password mismatch')

     }else{
      this.service.updateSuperPassword(data.firstpass).subscribe(
        resp=>{
          alert("new password has successfull updated")

          this.popup2.hide()
        })
           
         
         
     }
   }
   updateMail(data){
     this.service.updateEmail(data.email).subscribe(
       resp=>{alert('succesfull update to '+data.email)
       this.service.refreshSupervisorDetail().subscribe(
         resp=>{
           sessionStorage.clear()
         sessionStorage.setItem('userData',JSON.stringify(resp[0]))
         })
     })
    
   }
   updateName(data){
     
     this.service.updateName(data.firstname).subscribe(
       resp=>{alert('succesfull update to '+data.firstname)
       this.service.refreshSupervisorDetail().subscribe(
         resp=>{
           sessionStorage.clear()
         sessionStorage.setItem('userData',JSON.stringify(resp[0]))
         })
     })

     
   }
   updatePhone(data){
     console.log()
     this.service.updatePhoneNo(data.phoneN).subscribe(
       resp=>{alert('succesfull update to '+data.phoneN)
       this.service.refreshSupervisorDetail().subscribe(
         resp=>{
           sessionStorage.clear()
         sessionStorage.setItem('userData',JSON.stringify(resp[0]))
         })
     })
 }
 updateExpert(data){
   console.log()
 this.service.updateExpertis(data.expert).subscribe(
   resp=>{(alert('succesfull update to '+data.expert))
   this.service.refreshSupervisorDetail().subscribe(
     resp=>{
       sessionStorage.clear()
     sessionStorage.setItem('userData',JSON.stringify(resp[0]))
     })
 })
}
updateOfficeNumber(data){
  this.service.updateOfficeNumber(data.officeNo).subscribe(
    resp=>{alert('succesful update to '+data.officeNo)
    this.service.refreshSupervisorDetail().subscribe(
      resp=>{
        sessionStorage.clear()
      sessionStorage.setItem('userData',JSON.stringify(resp[0]))
      })
  })
  
}

}
