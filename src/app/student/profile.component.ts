import { Component, OnInit,ViewChild  } from '@angular/core';
import {StudentService} from './student.service';
import {NgForm} from '@angular/forms';
import {Popup} from 'ng2-opd-popup';
 

@Component({
  selector: 'app-profile',
  template: `
    <div class="row">
    <!-- view status -->
    <div class="col-md-5" style="box-shadow: 0 0 10px grey">
      
      <div style="background-color: #dfe3ee;"class="status" >
      <h4 style="text-align: center;padding-top: 5px;"  >my status</h4>
      <hr>
      </div>
      <ul class="list-group">
        <li class="list-group-item">conceptNote passed <span class="badge" *ngIf="supervisor!=null">yes</span><span class="badge" *ngIf="supervisor==null">not yet</span></li>
                
        <li class="list-group-item">supervisor: 
          <span class="badge" *ngIf="supervisor==null">not assigned yet</span>
          <span class="badge" *ngIf="supervisor!=null">{{supervisorName}}</span>
        <li class="list-group-item  "> <a data-toggle="collapse" href="#collapse3"  class=" center-block" *ngIf="haveGroup!=null">view my group members  &emsp; <span class=" pull-right">NO &emsp; {{haveGroup}}</span> </a>
        <div id="collapse3" class="panel-collapse collapse" >
                <ul class="list-group">
                  <li class="list-group-item" *ngIf="firstMember!=''">
                   name :&emsp; {{firsMFname}}&emsp;{{firsMLname}} <span class="badge ">adim</span>  <br>
                   regNo :&emsp; {{firstMember}}
                  </li>
                  <li class="list-group-item" *ngIf="showSecond">
                   name :&emsp; {{secondMFname}}&emsp;{{secondMLname}} <span class="badge">2</span>  <br>
                   regNo :&emsp; {{secondMember}}
                  </li>
                  <li class="list-group-item" *ngIf="showLast">
                   name :&emsp; {{lastMemberFname}}&emsp;{{lastMemberLname}} <span class="badge ">3</span>  <br>
                   regNo :&emsp; {{lastMember}}
                  </li>
                 
                  <li class="list-group-item" *ngIf="leftGroup" (click)="whantToleftGroup()"><button class=" form-control btn-default ">left group</button></li>
                </ul>
                
              </div>
        </li>
        
      </ul>

    </div>
    <!-- view status -->
     <div class="col-md-1"></div>
    
    

      <div class="col-md-6" style="box-shadow: 0 0 10px grey">
        
        <!-- images demo -->
        <!-- new image demo -->
        <ul class="list-group">
          <li class="list-group-item" style="background-color: #dfe3ee;text-align: center;">MY PROFILE</li>
          <li class="list-group-item">

            <img src="./assets/systemImages/st.jpg" class="center-block img-rounded" width="100" height="100"  alt="" *ngIf="!userImage" (click)="imageClick()">
            <img src="{{userImage}}" alt="" class="center-block "  width="100" height="100" *ngIf="userImage" (click)="imageClick()">
            </li>
            
              

              <table class="table table-bordered" width="100%" height="" >
               
                <tbody>
                  <tr>
                    <th scope="row">firstname</th>
                    <td style="text-align: left;">
                      <p class="nam" *ngIf="!showForm">{{stFirstName}}</p>
                      <form action="" style="display: inline-flex;" #mi="ngForm" (ngSubmit)="firstname(mi.value)" *ngIf="showForm">
                        <input type="text" class="inp"  required="" placeholder="{{stFirstName}}" name="firstname" class="bo inp" ngModel><span><button type="submit" class="bo">UPDATE</button></span>
                      </form>
                     

                    
                  </td>
                    
                    
                  </tr>
                  <tr>
                    <th scope="row">lastname</th>

                    <td style="text-align: left;">
                      <p class="nam" *ngIf="!showForm">{{stLastName}}</p>
                      <form action="" style="display: inline-flex;" #ol="ngForm" (ngSubmit)="lastname(ol.value)" *ngIf="showForm">
                        <input type="text"   required="" placeholder="{{stLastName}}" name="lastname" class="bo inp" ngModel><button type="submit" class="bo" >UPDATE</button>
                        
                      </form>
                      
                    </td>
                    
                    
                  </tr>
                  <tr>
                    <th scope="row">email</th>
                    <td style="text-align: left;">
                      <p class="nam"  *ngIf="!showForm">{{email}}</p>
                    
                      <form #f="ngForm" (ngSubmit)="updateMail(f.value)" style="display: inline-flex;" *ngIf="showForm">
                         
                        <input type="email"  placeholder="{{email}}" name="email" required ngModel class="bo inp">
                        <button [disabled]="!f.valid" class="bo" type="submit" >UPDATE</button>
                      </form>
                    </td>
                    
                    
                  </tr>
                  <tr>
                    <th scope="row">course</th>
                    <td style="text-align: left;">
                      <p class="nam"  *ngIf="!showForm">{{course}}</p>
                      
                      <form action="" style="display: inline-flex;"  #op="ngForm" (ngSubmit)="updatecourse(op.value)" *ngIf="showForm">
                        <select  required=""  class="bo inp" name="course" ngModel>
                          <option >BSC. in computer scie..</option>
                          <option >BSC.with computer sci..</option>
                          <option >telecom enginearing</option>
                          <option >electronics enginiering</option>
                        </select>
                        <button type="submit" class="bo">UPDATE</button>
                      </form>
                      
                    </td>
                    
                    
                  </tr>


                  
                </tbody>
              </table>
               <img class="pull-right" src="./assets/systemImages/pen.jpg" width="50" height="18" alt="edit" (click)="changeDisplay()">
              
            
            <a  class="center-block" (click)="changePass()">
               change password?
            </a>
          
        </ul>
        <!-- new image demo -->


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
  `,
  styles: [`
.status{
  box-shadow: 0 1px 2px #dfe3ee;
  box-shadow: 0 7px 0 -5px #8A42FF;
  box-shadow: 0 6px 0 -4px #8A42FF;
}
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
.nam{
  text-align:left;
}


  `],
  providers:[StudentService]
})
export class ProfileComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
private firstMember:string;
private firsMFname:string;
private firsMLname:string;
private secondMember:string;
private secondMFname:string;
private secondMLname:string;
private lastMember:string;
private lastMemberFname:string;
private lastMemberLname:string;
private supervisor:string;
private supervisorName:string;
private haveGroup:any;
private leftGroup:boolean=false;
private nullData:string=null;
private showSecond:boolean=false;
private showLast:boolean=false;

private userData:any=JSON.parse( sessionStorage.getItem('userData'));
private userImage:string=this.userData["profile_picture"]
private email:string=this.userData["email"]
private course:string=this.userData["course"]
private stFirstName:string=this.userData["firstname"]
private stLastName:string=this.userData["lastname"]
private showForm:boolean=false;




  constructor(private service:StudentService,private popup:Popup) {
  
   }

  ngOnInit() {
    
    if (this.service.groupno!=null){

    
      this.haveGroup=this.service.groupno
    

    this.service.getStudentProfile().subscribe(
      resp=>{
        this.firstMember=resp[0].first_member_reg_no
        this.supervisor=resp[0].supervisor_employee_id
        if (this.supervisor!=null || '') {
          this.service.getSupervisorName(this.supervisor).subscribe(
            res=>{
              this.supervisorName=res.name
            }
            )
        }
        
        if (this.service.registrationsnumber!=this.firstMember) {
          this.leftGroup=true
        }

        if (this.firstMember!="" || null) {
          this.service.getStudentNames(this.firstMember).subscribe(
            res=>{this.firsMFname=res[0].firstname,this.firsMLname=res[0].lastname}
            )
        }
        
        this.secondMember=resp[0].second_member_reg_no
        
        if (this.secondMember=="undefined") {
          this.secondMember=null
          
        }
        if ( (  this.secondMember!= null && this.secondMember!="")) {
           this.service.getStudentNames(this.secondMember).subscribe(
            res=>{this.secondMFname=res[0].firstname,this.secondMLname=res[0].lastname,
              
              this.showSecond=true
              
            }
            )
        }
        this.lastMember=resp[0].third_member_reg_no
        
        if (this.lastMember=="undefined") {
          this.lastMember=null
          
        }
        if (this.lastMember!=null && this.lastMember!="" ) {
            
           this.service.getStudentNames(this.lastMember).subscribe(
            res=>{this.lastMemberFname=res[0].firstname,this.lastMemberLname=res[0].lastname,
              this.showLast=true
            }
            )
        }

      }
      )
    }
  }
  private emp:string=''
whantToleftGroup(){
  if (this.service.registrationsnumber==this.secondMember) {
  console.log("from secm"+this.nullData)
    this.service.updateSecondMemberOfGroup(this.nullData).subscribe(
      resp=>{
        this.service.updateSecondMemberOfStudentGroup(this.emp).subscribe(
          resp=>alert("succesfull left"))
        }
      )
    return
  }
  if (this.service.registrationsnumber==this.lastMember) {
    console.log("from third m"+this.nullData)
    this.service.updateThirdMemberOfGroup(this.nullData).subscribe(
      resp=>{
        this.service.updateSecondMemberOfStudentGroup(this.emp).subscribe(
          resp=>alert("succesfull left"))
     }
      )
    return
  }
}
 newfiles : FileList; 
      getRFiles(event){ 
          this.newfiles = event.target.files; 
      } 
      imageUpdate(){
        if (this.newfiles==undefined) {
          alert('please choose file image')
          return
        }
        this.service.updateProfileImage(this.newfiles[0]).subscribe(

          resp=>{alert("succesfull update "+this.newfiles[0].name)
          this.service.refreshStudent().subscribe(
            resp=>{
              sessionStorage.clear()
            sessionStorage.setItem('userData',JSON.stringify(resp[0]))
            }

            )
        },

          error=>alert("choose image file please")
          )
        this.popup1.hide()
      }
      updatePass(data){
      if(data.firstpass!=data.secondpass){
        alert('failed password mismatch')

      }else{
        this.service.updatePassword(data.firstpass).subscribe(
          resp=>{
            alert('succesfull update');
            this.popup2.hide()
          }
          )
      }
    }
    updateMail(data){
      this.service.updateEmail(data.email).subscribe(
      resp=>{
        alert("succesful")
        this.service.refreshStudent().subscribe(
          resp=>{
            sessionStorage.clear()
          sessionStorage.setItem('userData',JSON.stringify(resp[0]))
          }

          )
      },
        error=>{
          alert('failed')
        }
      )
    }
    imageClick(){

      this.popup.options.header='change profile image'
       this.popup.options.confirmBtnContent="update"


    this.popup1.show()
    }
    changePass(){
      this.popup.options.header="change my password"
      this.popup.options.confirmBtnContent="applyChanges"
      this.popup.options.cancleBtnClass="btn btn-danger"
      this.popup2.show()
    }
    firstname(data:any){
      this.service.updateFirstname(data.firstname).subscribe(
        resp=>{
          alert("firstname updated to "+data.firstname)
          this.service.refreshStudent().subscribe(
            resp=>{
              sessionStorage.clear()
            sessionStorage.setItem('userData',JSON.stringify(resp[0]))
            }

            )

        },
        error=>{alert("failed")}
        )
      
    }
   lastname(data:any){
     this.service.updateLastname(data.lastname).subscribe(
       resp=>{alert("lastname updated to "+data.lastname)
       this.service.refreshStudent().subscribe(
         resp=>{
           sessionStorage.clear()
         sessionStorage.setItem('userData',JSON.stringify(resp[0]))
         }

         )
     },
       error=>{alert("failed")}
       )
      console.log(data.lastname)
    }
    updatecourse(data:any){
      this.service.updateCourse(data.course).subscribe(
        resp=>{alert("course updated to "+data.course)
      this.service.refreshStudent().subscribe(
        resp=>{
          sessionStorage.clear()
        sessionStorage.setItem('userData',JSON.stringify(resp[0]))
        }

        )
    },
        error=>{alert("failed")})
      console.log(data.course)
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
}
