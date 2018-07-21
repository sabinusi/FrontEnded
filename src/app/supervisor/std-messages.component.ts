import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import {SupervisorService} from './supervisor.service';
import { DatePipe } from '@angular/common';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-std-messages',
  template: `
 <div class="row">
   <div class="col-md-12">
    
     <ng-table [config]="config"
               (tableChanged)="onChangeTable(config)"
               (cellClicked)="onCellClick($event)"
               [rows]="rows" [columns]="columns">
     </ng-table>
     <pagination *ngIf="config.paging"
                 class="pagination-sm"
                 [(ngModel)]="page"
                 [totalItems]="length"
                 [itemsPerPage]="itemsPerPage"
                 [maxSize]="maxSize"
                 [boundaryLinks]="true"
                 [rotate]="false"
                 (pageChanged)="onChangeTable(config, $event)"
                 (numPages)="numPages = $event">
     </pagination>
   </div>
 </div>
 <popup  #popup1 class="s">
      <p style="margin-top: -40px;">{{title}}</p>
 </popup>
  
 <popup  #popup2 class="p" (confirmClick)="sendMessage()">
     <div class="row">
       <div class="col-md-12">
         <form action="" style="margin-bottom: -25px;">
           <div class="form-group">
            
            <textarea class="form-control" rows="3" [(ngModel)]="message" required name="message descrption ....." #t=ngModel   placeholder="description here....."></textarea>
           
          </div>
         </form>
       </div>
     </div>
 </popup>
   
  `,
  styles: [
`
:host /deep/ popup.s button:nth-child(2){
display:none;
  
}
:host /deep/ popup.p button:nth-child(1){
display:none;
  
}



`
  ],
  providers:[SupervisorService]
})
export class StdMessagesComponent implements OnInit,OnDestroy {
  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
public rows:Array<any> = [];
 public columns:Array<any> = [
   {title: 'Title', name: 'student_title'},
   {
     title: 'SenderName',
     name: 'student_names',
   },
   {title: 'Message.', name: 'message_from_student',className: ['office-header', 'text-success']},
   {title: 'Reply.', name: 'reply',className: ['office-header', 'text-success']},
   
   
   
 ];
 public page:number = 1;
 public itemsPerPage:number = 10;
 public maxSize:number = 5;
 public numPages:number = 1;
 public length:number = 0;

 public config:any = {
   paging: true,
   sorting: {columns: this.columns},
   filtering: {filterString: ''},
   className: ['table-striped', 'table-bordered']
 };

 private data:Array<any> = [];

 public constructor(private service:SupervisorService,private popup:Popup) {
   this.length = this.data.length;
 }
 
 
 

 public ngOnInit():void {
   // here are datas for poup messages
   this.popup.options = {
       header: "",
       color: "#5cb85c", // red, blue.... 
       widthProsentage: 70, // The with of the popou measured by browser width 
       animationDuration: 0, // in seconds, 0 = no animation 
       showButtons: true, // You can hide this in case you want to use custom buttons 
       confirmBtnContent: "send", // The text on your confirm button 
       cancleBtnContent: "close", // the text on your cancel button 
       confirmBtnClass: "btn btn-primary", // your class for styling the confirm button 
       cancleBtnClass: "btn btn-success", // you class for styling the cancel button 
       animation: "fadeInRight" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
   };
   // here are datas for poup messages


  this.service.viewReceivedMessageFromStudent().subscribe(
    (resp)=>resp.forEach(item=>{
     const a=[]
     a.push(item)
      this.data.push(item)
        a[0]["student_title"]="<a class='btn btn-default'>viewTitle</a>"
        if (item.readed==true) {
          a[0]["message_from_student"]="<p style='box-shadow:2px 1px 3px 2px grey;' >"+a[0]["message_from_student"]+"</p>"
        }else{
          a[0]["message_from_student"]="<p style='box-shadow:2px  3px 2px green;'>"+a[0]["message_from_student"]+"</p>"
        }
       
        a[0]["reply"]="<button class='btn btn-primary'>reply</button>"
        

       this.length=this.data.length;
      this.onChangeTable(this.config);
      
    })
      
    )
   
 }

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

 public onCellClick(data: any): any {
   if (data.column==='student_title') {
     this.viewTitle(data.row.group_id)
   }
   if (data.column==='reply') {
     this.replyToStudent(data.row.group_id)
   }
 }
 private title:string;
 private viewTitle(data:any){

this.service.SupervisorgetStudentTitle(data).subscribe(
  resp=>{
    this.title=resp.title
    }
  )
this.popup.options.header="";
this.popup.options.color="#5cb85c"
this.popup1.show();

 }
 private message:string;
 private groupId:number;
 private replyToStudent(data:any){
     this.groupId=data
   this.popup.options.header="send message to whole group if exist"
   this.popup.options.color="blue"
this.popup2.show();


 }
 sendMessage(){
   this.service.sendMessageToStudents(this.groupId,this.message).subscribe(
       resp=>{
         alert("send succesfull")
         this.popup2.hide()
       }
     )
   
   

 }
  ngOnDestroy() {
    this.service.updateReadedMessages().subscribe(
      resp=>{}
      )
  }
}
