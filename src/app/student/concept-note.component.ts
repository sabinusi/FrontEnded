import { Component, OnInit } from '@angular/core';
import {StudentService} from './student.service';
import {Popup} from 'ng2-opd-popup';

import { NgForm} from '@angular/forms';



@Component({
  selector: 'app-concept-note',
  template: `
<!-- div of blocking services -->
<div *ngIf="!block">
  <div *ngIf="userData.studentgroup !=null">
  
    <table class="table table-bordered ">
  <caption style="text-align: center;background-color: #DFE3EE;font-size: 16px;color: black"> conceptNote submission status</caption>
      <thead>
        <tr>
          <th style="text-align: center;">title</th>
          <td> {{title}}</td>
        </tr>
        <tr style="text-align: center;">
          <th style="text-align: center;">supervisor</th>
          <td>{{oldsuper}} &emsp; &emsp;<b style="text-de">expertie in</b> &emsp;&emsp; {{oldsuperExpertie}}</td>
        </tr>
        <tr style="text-align: center;">
          <th>conceptNoteSubmited</th>
          <td><a href="{{readConceptNote}}" target="_blank" *ngIf="readConceptNote">view</a></td>
        </tr>
      </thead>

     
      

    </table>
    
  </div>
  <h4 class="alert alert-danger" style="text-align: center;" *ngIf="userData.studentgroup ==null">sorry coordinator has block service</h4>

</div>
<!-- div of blocking services -->

  <!-- div of blocking service -->
  <div *ngIf="block">
  <!-- codes for having a group -->
 <div class="container-fluid" *ngIf="userData.studentgroup !=null">
 <!-- change of title -->
   <div class="panel-group">
     <div class="panel panel-default">
       <div class="panel-heading">
         <h4 class="panel-title" style="text-align: center;">
           <a data-toggle="collapse" style="text-align: center;" href="#collapse4">resubmit proposed title <span class="caret"></span></a>
         </h4>
       </div>
       <div id="collapse4" class="panel-collapse collapse">
         <ul class="list-group">
           <li class="list-group-item" style="overflow: auto;">{{title}}  </li> 
                <!-- <li class="list-group-item"><input type="text" required [(ngModel)]="Newtitle" class="form-control" placeholder="type new title"></li> -->
                <li class="list-group-item">
                  <textarea style="overflow: hidden;"  cols="1" rows="2" class="form-control" required  [(ngModel)]="Newtitle" placeholder="type new title"></textarea>
                </li>
                <li class="list-group-item"><span><button (click)="resubmitTitle()" class="btn-default badge center-block">resubmit</button></span></li>
         </ul>
         
       </div>
     </div>
   </div>
 
 <!-- change of title -->
 
   <ul class="list-group">
     <li class="list-group-item " style="text-align: center;background-color: #8b9dc3;font-size: 16px;">conceptNoteResubmision</li>
     <li class="list-group-item" > <a href="{{readConceptNote}}" target="_blank" *ngIf="readConceptNote">read-old </a></li>
     <li class="list-group-item" >
       <form enctype="multipart//form-data">
       <input type="file" (change)="getRFiles($event)" accept="application/pdf">

       </form>
       <button style="margin-top: -3%;" class="badge btn-default pull-right" (click)="resubmitFile()">resubmit</button></li> 
     
   </ul>

   <!-- change of supervisor -->
   <div class="panel-group" >
       <div class="panel panel-default">
         <div class="panel-heading">
           <h4 class="panel-title" style="text-align: center;">
             <a data-toggle="collapse" href="#collapse6"> resubmit supervisor <span class="caret"></span></a>
           </h4>
         </div>
         <div id="collapse6" class="panel-collapse collapse">
           <ul class="list-group">
             <li class="list-group-item">{{oldsuper}} &emsp; &emsp;<b style="text-de">expertie in</b> &emsp;&emsp; {{oldsuperExpertie}}</li>
                 <li class="list-group-item">
                   <form #n=ngForm (ngSubmit)=resubmitSupervisor(n.value)>
                  <select class="form-control" [(ngModel)]="newSuperName" name="super" style="margin-bottom: 5px;" required>
                    
                         <option  *ngFor="let item of supervisorNamesAndExperties"><pre>{{item.name}}&emsp;/{{item.experties}}</pre></option>
                       </select>
                       <button style="" class="center-block badge btn-default" >resubmit</button>
                  </form>
                </li> 
           </ul>
           
         </div>
       </div>
     </div>
   <!-- change of supervisor -->
   
  </div>
  <!-- codes for having a group -->
   <div class="container-fluid" *ngIf="userData.studentgroup ==null">
   <!-- creating heading -->
          <div class="row head">
             <div class="col-md-12 col-xs-12 col-sm-12">
                  <h4 style="font-size: 14px">PLEASE READ THIS SAMPLE  <span ><a target="_blank" href="http://localhost:8666/Project.pdf"><span class="glyphicon glyphicon-file pull-right"></span></a></span></h4>
       
              </div>
          </div>
          <!-- creating heading -->

          <!-- creating quasion -->
    <div *ngIf="ask ==true ">
      <div class="row ask">
          <div class="col-md-12">
            <h4 style="font-size: 12px;">working with group ? <span class="pull-right" style="display: block;margin-top: -8px;margin-bottom: 2px;">
            <button  type="button" class="btn btn-block btn-primary pull-right" data-toggle="modal" data-target="#myModal" style="">yes</button>
          </span><span class="pull-right" style="margin-right: 5px;margin-top: -8px;">
            <button class="btn btn btn-block btn-danger" (click)="controlAsk()">no</button>
           </span>
          </h4>
        </div>
     </div>
     </div>
   <!-- creating quasion -->

<!-- creating form -->
   <div class="row form">
          <div class="col-md-12 pus">
                 <form  #mi="ngForm" (ngSubmit)="createGroup()" enctype="multipart/form-data" class="list-group">
                  <li class="list-group-item">
                     <div class="form-group">
                        <!-- <label for="email" style="font-size:16px; text-transform: uppercase;word-spacing: 2px;">propose-title </label> -->
                                <div class="input-group">
                                  <!-- #title=ngForm -->
                                    <span class="input-group-addon glyphicon glyphicon-pencil"></span>
                                       <textarea   cols="1" rows="2" class="form-control" placeholder="youre propose title is...." required  [(ngModel)]="datas.title" name="title"></textarea>
                                             <span class="input-group-addon glyphicon glyphicon-pencil"></span>
                                    </div>
                                </div>
                                </li>
                                <li class="list-group-item">
                                 <div class="form-group">
                                  <label for="text" style="font-size:16px; text-transform: uppercase;word-spacing: 2px;">choose concept-note</label>
       <div class="input-group">
          <!-- #file=ngForm -->
         <!-- <span class="input-group-addon glyphicon glyphicon-file"></span> -->
         <input type="file" accept="application/pdf"  required [(ngModel)]="datas.conceptN" name="file" (change)="getFiles($event)">
         
         </div>
     </div>
     </li>
     
     <li class="list-group-item">
     <div class="form-group">
     <label for="email" style="font-size:16px; text-transform: uppercase;word-spacing: 2px;">propose-Supervisor </label>

     <div class="input-group">
       <!-- #supervisor=ngForm -->
          <span class="input-group-addon glyphicon glyphicon-user"></span>
          
          <select class="form-control"   [(ngModel)]="datas.proposedT" name="supervisor">
            
                 <option *ngFor="let item of supervisorNamesAndExperties"><pre>{{item.name}}&emsp;/{{item.experties}}</pre></option>
               </select>
              <span class="input-group-addon glyphicon glyphicon-user"></span>
       </div>
     </div>
     

     
     <button type="submit" class="btn btn-primary center-block" style="width: 210px;" >Submit</button>
     </li>
                 </form>
     
             </div>
     </div>
       <!-- creating form -->

<!-- modal creation here -->
<!-- Modal -->

 <div class="modal fade" id="myModal" role="dialog" style="overflow: auto;width: 1250px;">
   <div class="modal-dialog">
   
     <!-- Modal content-->
     <div class="modal-content">
       <div class="modal-header">
                    
         <h5 style="text-align: center">CHOOSE 2 GROUP MEMBERS <span class="pull-right"><button type="button" class="close" data-dismiss="modal">&times;</button></span></h5>
         
       </div>
       <div class="container"><div class="row"> <div class="col-md-6 col-sm-12 col-xs-12 ">
       <div class="modal-body " *ngIf="noOfmebers!=2">
       
           <ng-table  [config]="config"
                     (tableChanged)="onChangeTable(config)"
                     (cellClicked)="onCellClick($event)"
                     [rows]="rows" [columns]="columns">
           </ng-table>
           <hr>
           <h4 class="center-block" style="font-style: italic;font-size: 15px;">number of choosen <span class="badge badge-default badge-pill">{{noOfmebers}}</span></h4>
         
                    
       </div>
       <div class="modal-body" *ngIf="noOfmebers==2">
         
           <ul class="list-group">
              <li class="list-group-item active">group members</li>
              <li class="list-group-item">me<span class="badge">1</span></li>
              <li class="list-group-item"> {{displayChosen[0].row.firstname}}  {{displayChosen[0].row.lastname}}&emsp; {{displayChosen[0].row.student_reg_no}}<span class="badge">2</span></li>
              <li class="list-group-item"> {{displayChosen[1].row.firstname}}  {{displayChosen[1].row.lastname}} &emsp;{{displayChosen[1].row.student_reg_no}}<span class="badge">3</span></li>
            </ul>
           

         
         
       </div>
       
     
   </div>
 </div>
 </div></div></div>
<!-- modal creation here -->
<!-- some more popups -->
<popup (confirmClick)="ConfirmEvent()" (cancelClick)="CancelEvent()">
     <pre>{{choosenStudent.firstname}}  {{choosenStudent.lastname}}  {{choosenStudent.regNo}}</pre> 
</popup>
<!-- some more popups -->

     
   </div> 


     <!-- div of blocking service -->
    </div>
  `,
  styles: [
`
.head{
  box-shadow:0 0 10px grey;
  margin-bottom: 10px;
}
h3{
  text-align: center;
  text-transform: uppercase;
}
.ask{
  box-shadow:0 0 10px grey;
  text-align: left;

  text-transform: uppercase;
  margin-bottom: 20px;
}
.form{
  box-shadow:0 0 10px grey;
}
.pus{
  margin-top:10px;
  padding-top:10px;
  text-align:center;
}
.pus label{
  font-family: monospace;
  
  font-weight: normal;
}




`
  ],
  providers:[StudentService]
})
export class ConceptNoteComponent implements OnInit {
//afer having a group
private title:string;
private Newtitle:string;
private readConceptNote:string;
private oldsuper:string;
private oldsuperExpertie:string;

private newSuperName:string;

//after having a groups
// get user from localStorage
private userData:any=JSON.parse( sessionStorage.getItem('userData'));
private MfirstN:string=this.userData['firstname']
private Mreg:string=this.userData['student_reg_no']

private displayChosen=new Array();

// get user from localStorage
  // datatosen
  files : FileList; 
      getFiles(event){ 
          this.files = event.target.files; 
      } 


datas={
  firstM:'',
  secondM:'',
  thirdM:'',
  title:'',
  proposedT:''
}

  // datatosen

  // popup optioins

  options = {
      header: "A CHOSEN MEMBER IS?",
      color: "#5cb85c", // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 0, // in seconds, 0 = no animation 
       showButtons: true,// You can hide this in case you want to use custom buttons 
      confirmBtnContent: "yes", // The text on your confirm button 
      cancleBtnContent: "no", // the text on your cancel button 
      confirmBtnClass: "btn btn-primary", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
  };

  // popup optioins

  private noOfmebers:number=0
  
  private chooseneMembers=new Array()
  choosenStudent={
    firstname:'',
    lastname:'',
    regNo:''
  }
private ask:boolean=true
private supervisorNamesAndExperties:any
// table data
public rows:Array<any> = [];
  public columns:Array<any> = [
    
    {title: 'Lastname', name: 'lastname',filtering: {filterString: '', placeholder: 'Search by lastname'},},
    {
      title: 'Reg-Number',
      name: 'student_reg_no',
      sort: false,
      filtering: {filterString: '', placeholder: 'serach by reg_No'}
    }
    
  ];
  public page:number = 1;
  public itemsPerPage:number = 4;
  public maxSize:number = 10;
  public numPages:number = 1;
  public length:number = 0;

  public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped','table-bordered','table-hover']
  };

  private data:Array<any> = [];
// table data
  constructor(private service:StudentService,private popup:Popup) {
    this.length = this.data.length;
   }
//desigsion of blocking everything
private block:boolean=false
  ngOnInit():void {

    this.service.getConceptNoteStatus().subscribe( resp=>this.block=resp[0].submitConceptNote)
    if (this.userData.studentgroup !=null) {
      this.service.getAllStudentGroupDatas(this.userData.studentgroup).subscribe(
        resp=>{this.title=resp[0].group_title.title;this.readConceptNote=resp[0].group_title.concept_note;

          
          this.service.getSupervisorWithExpertieUsingEmployeeId(resp[0].proposed_supervisor).subscribe(
            resp=>{this.oldsuper=resp.name;this.oldsuperExpertie=resp.experties}
            )

        },
        error=>{console.log("error from gG"+error)}
        )
    }
    this.service.ViewSuperVisorWithExperties().subscribe(
   resp=>this.supervisorNamesAndExperties=resp

    )
    this.service.ListOfnoneGroupOwners().subscribe(

     (resp)=>resp.forEach(item=>{

       this.data.push(item)
        this.length=this.data.length;
       this.onChangeTable(this.config);
       

     }

      
     )
    );
    
  }
private controlAsk(){
  this.ask=false

}

// table creations
public changePage(page:any, data:Array<any> = this.data):Array<any> {
   let start = (page.page - 1) * page.itemsPerPage;
   let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
   return data.slice(start, end);
 }

 public changeSort(data:any, config:any):any {
   if (!config.sorting) {
     return data;
   }

   let columns = this.config.sorting.columns || [];
   let columnName:string = void 0;
   let sort:string = void 0;

   for (let i = 0; i < columns.length; i++) {
     if (columns[i].sort !== '' && columns[i].sort !== false) {
       columnName = columns[i].name;
       sort = columns[i].sort;
     }
   }

   if (!columnName) {
     return data;
   }

   // simple sorting
   return data.sort((previous:any, current:any) => {
     if (previous[columnName] > current[columnName]) {
       return sort === 'desc' ? -1 : 1;
     } else if (previous[columnName] < current[columnName]) {
       return sort === 'asc' ? -1 : 1;
     }
     return 0;
   });
 }

 public changeFilter(data:any, config:any):any {
   let filteredData:Array<any> = data;
   this.columns.forEach((column:any) => {
     if (column.filtering) {
       filteredData = filteredData.filter((item:any) => {
         return item[column.name].match(column.filtering.filterString);
       });
     }
   });

   if (!config.filtering) {
     return filteredData;
   }

   if (config.filtering.columnName) {
     return filteredData.filter((item:any) =>
       item[config.filtering.columnName].match(this.config.filtering.filterString));
   }

   let tempArray:Array<any> = [];
   filteredData.forEach((item:any) => {
     let flag = false;
     this.columns.forEach((column:any) => {
       if (item[column.name].toString().match(this.config.filtering.filterString)) {
         flag = true;
       }
     });
     if (flag) {
       tempArray.push(item);
     }
   });
   filteredData = tempArray;

   return filteredData;
 }

 public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
   if (config.filtering) {
     Object.assign(this.config.filtering, config.filtering);
   }

   if (config.sorting) {
     Object.assign(this.config.sorting, config.sorting);
   }

   let filteredData = this.changeFilter(this.data, this.config);
   let sortedData = this.changeSort(filteredData, this.config);
   this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
   this.length = sortedData.length;
 }

 public onCellClick(data: any) {
   
   this.choosenStudent.firstname=data.row.firstname
   this.choosenStudent.lastname=data.row.lastname
   this.choosenStudent.regNo=data.row.student_reg_no
   if (this.choosenStudent.regNo!=this.service.registrationsnumber){
  this.displayChosen.push(data)

}
   
   

   this.popup.show(this.options);
 }
// table creations

// popup activities

ConfirmEvent(){
if (this.choosenStudent.regNo==this.service.registrationsnumber){
  alert("you already picked by the system to this group")

}else {
  this.chooseneMembers.push(this.choosenStudent.regNo)
  if (this.chooseneMembers.length==2) {
    if (this.chooseneMembers[0]==this.chooseneMembers[1]) {
      alert('sory u repeat the same person chose again')
      this.chooseneMembers.splice(1,1)
      this.displayChosen.splice(1,1)
    }
  }
  this.noOfmebers=this.chooseneMembers.length
  
  this.datas.secondM=this.chooseneMembers[0]
  this.datas.thirdM=this.chooseneMembers[1]
  this.popup.hide()
  
  }
  
}

CancelEvent(){
  }
  
 
  createGroup(){
         var suempid;
     
        this.datas.firstM=this.userData["student_reg_no"];
        
        const superid=[]
        superid.push(this.datas.proposedT.split('/'))
              
        this.service.getSuperVisorId(superid[0][0].trim(),superid[0][1]).subscribe(
         resp=>{
           
           
          suempid=resp[0].employee_id
            this.service.greatGroup(this.datas.firstM,this.datas.secondM,this.datas.thirdM,this.files[0],this.datas.title,suempid).
    subscribe(resp=>{

      this.service.getId(this.datas.firstM).subscribe(data=>{
          this.service.updateGroupId(data[0].group_id,this.datas.firstM).subscribe(
            res=>{  
              
              this.userData['studentgroup']=res.studentgroup;
              this.service.getNewStudentDatas() .subscribe(
               resp=>{
                 sessionStorage.clear()
                 sessionStorage.setItem('userData',JSON.stringify(resp))
                 this.service.greatConceptNoteTosupervisor(suempid,res.studentgroup).subscribe(
                   resp=>{}

                   )
                 
                

               }
                )
             
              
            if (this.datas.secondM!='') {
                this.service.updateGroupId(data[0].group_id,this.datas.secondM).subscribe(
                  res=>{

                    if (this.datas.thirdM!='') {
                      this.service.updateGroupId(data[0].group_id,this.datas.thirdM).subscribe(
                        res=>{
                             
                        }
                        )
                    }
                  }

                  )
              }
              
            }
            
            )
      })
      

    },
    errr=>{
      console.log(errr)
    }
    
    
    )
          
         }
          );
    
        
   
}
  //form actions

// resubmision area

resubmitTitle(){
  this.service.updateTitle(this.Newtitle,this.userData.studentgroup).subscribe(
   resp=>{alert("title succesfull changed to  "+resp.title) }
    )
}

//conceptNoteAres

newfiles : FileList; 
    getRFiles(event){ 
        this.newfiles = event.target.files; 
    } 

    resubmitFile(){
      this.service.updateConceptNote(this.newfiles[0],this.userData.studentgroup).subscribe(
        resp=>{alert("succesiful resubmit "+this.newfiles[0].name)}
        )
  }
//conceptNoteAres
resubmitSupervisor(){
  
  
  var suempid;
   const superid=[]
        superid.push(this.newSuperName.split('/'))

        this.service.getSuperVisorId(superid[0][0].trim(),superid[0][1]).subscribe(
         resp=>{
           
           
          suempid=resp[0].employee_id
          
            this.service.updateProposedSuper(suempid,this.userData.studentgroup).subscribe(
          resp=>{alert("succesful changed to   "+this.newSuperName)}
          )
        })

      
  
}


}
