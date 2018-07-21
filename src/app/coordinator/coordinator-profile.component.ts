import { Component, OnInit ,ViewChild} from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {NgForm} from '@angular/forms';
import {CordinatorService} from './cordinator.service';

@Component({
  selector: 'app-coordinator-profile',
  template: `
   <hr>
    <div class="row">
     <div class="col-md-8 col-md-push-2">
       <ul class="list-group">
         <li class="list-group-item" style="background-color: #dfe3ee;text-align: center;">MY PROFILE</li>
         <li class="list-group-item" style="text-align: center;">
           <img src="./assets/systemImages/st.jpg" class="center-block img-rounded" width="100" height="100" *ngIf="!picUrl" alt="" (click)="imageClick()">
           <img src="{{picUrl}}" alt="" class="center-block "  width="100" height="100" *ngIf="picUrl" (click)="imageClick()">
         </li>
         <li class="list-group-item">
           <table class="table-bordered" width="100%" style="text-align: center;">
             
               <tr>
               <td>name</td>
               <td>
                 <p class="nam" *ngIf="!showForm">{{name}}</p>
                 <form action="" style="display: inline-flex;" #mi="ngForm" (ngSubmit)="updateName(mi.value)" *ngIf="showForm">
                   <input type="text"   required="" placeholder="{{name}}" name="firstname" class="bo inp" ngModel><span><button type="submit" class="bo inp" >UPDATE</button></span>
                 </form>
                 
               </td>
               </tr>
               
               <tr>
                 <td>email</td>
                 <td>
                   <p class="nam"  *ngIf="!showForm">{{email}}</p>
                   
                   <form #f="ngForm" (ngSubmit)="updateMail(f.value)" style="display: inline-flex;" *ngIf="showForm">
                      
                     <input type="email" class="bo inp"  placeholder="{{email}}" name="email" required ngModel >
                     <button [disabled]="!f.valid" class="bo inp" type="submit" >UPDATE</button>
                   </form>
                 </td>
               </tr>
               <tr>
                 
               </tr>
             
             
           </table>
         </li>
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
  .bo{
    border: 5px groove white;
  }
  :host /deep/ popup.s button:nth-child(2){
display:none;
  
}
 
  .inp{
    background-color: #DFE3EE;
    text-align: center;
  }
  `
  ],
  providers:[CordinatorService]
})
export class CoordinatorProfileComponent implements OnInit {
 @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
private userData:any=JSON.parse( sessionStorage.getItem('userData'));
private picUrl:string=this.userData["profile_picture"]
private name:string=this.userData["name"];
private email:string=this.userData["email"];
private showForm:boolean=false;
  constructor(private popup:Popup,private service:CordinatorService) { }

  ngOnInit() {
   
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
      this.service.updateProfilePic(this.newfiles[0]).subscribe(
        resp=>{alert("succesfull update "+this.newfiles[0].name)
        this.service.refreshCordinator().subscribe(
         resp=>{
           sessionStorage.clear()
           sessionStorage.setItem('userData',JSON.stringify(resp[0]))
         }
          )
        
        this.popup1.hide()
      })


      
    }
      updatePass(data){
      if(data.firstpass!=data.secondpass){
        alert('failed password mismatch')

      }else{
       //bacended
       this.service.updatePassword(data.firstpass).subscribe(
         resp=>{alert("succesfull");
         
            this.popup2.hide()
          }

            )
          
          
      }
    }
    updateMail(data){

      this.service.updateEmail(data.email).subscribe(
        resp=>{alert('succesfull')
        this.service.refreshCordinator().subscribe(
         resp=>{
           sessionStorage.clear()
           sessionStorage.setItem('userData',JSON.stringify(resp[0]))
         })

      })

    }
    updateName(data){
      
      this.service.updateName(data.firstname).subscribe(
        resp=>{alert("succesfull")
        this.service.refreshCordinator().subscribe(
         resp=>{
           sessionStorage.clear()
           sessionStorage.setItem('userData',JSON.stringify(resp[0]))
         })

      })

    }
}
