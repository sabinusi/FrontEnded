import { Component, OnInit } from '@angular/core';
import {SupervisorService} from './supervisor.service';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-received-concept',
  template: `

<!-- here i will put some error message poupup -->
<popup (confirmClick)="sendMessageReason()">
    <div class="row">
      <div class="col-md-12">
        <form action="" style="margin-bottom: -25px;">
          <div class="form-group">
           
           <textarea class="form-control" rows="3" [(ngModel)]="reason" required name="descrption" #t=ngModel   placeholder="description here....."></textarea>
          
         </div>
        </form>
      </div>
    </div>
</popup>
<!-- here i will put some error message poupup -->
    <div class="row" *ngIf="hide">
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
      <pre *ngIf="config.paging" class="card card-block card-header">Page: {{page}} / {{numPages}}</pre>
       
      </div>
    </div>
    <div *ngIf="!hide" class="center-block  alert-info" style="text-align: center;">
      <p style="font-size: 20px">there is no conceptNote submitted</p>
    </div>
  `,
  styles: [
`

:host /deep/ popup button:nth-child(1){
display:none;
  
}
`
  ],
  providers:[SupervisorService]
})
export class ReceivedConceptComponent implements OnInit {
//resons for rejections of conceptNote
  private reason:any;
  private groupid:any;
  public rows:Array<any> = [];
       public columns:Array<any> = [
         {title: 'Title', name:'title'},
         {
           title: 'ConceptNote',
           name: 'concept_note',
           
         },
         {
           title: 'accept',
           name: 'accept',

           
         },{
           title: 'reject',
           name: 'reject',
           
           
         }
         
        
       ];
       public page:number = 1;
       public itemsPerPage:number = 10;
       public maxSize:number = 5;
       public numPages:number = 1;
       public length:number = 0;
       public hide:boolean=true;

       public config:any = {
         paging: true,
         sorting: {columns: this.columns},
         filtering: {filterString: ''},
         className: ['table-striped', 'table-bordered','ng-table ']
       };

       private data:Array<any> = [];


       public constructor(private service:SupervisorService,private popup:Popup ) {
         this.length = this.data.length;
       }


       public ngOnInit():void {
         // here are poup options
         this.popup.options = {
             header: "Reasons to reject",
             color: "#5cb85c", // red, blue.... 
             widthProsentage: 70, // The with of the popou measured by browser width 
             animationDuration: 0, // in seconds, 0 = no animation 
             showButtons: true, // You can hide this in case you want to use custom buttons 
             confirmBtnContent: "send", // The text on your confirm button 
             cancleBtnContent: "close", // the text on your cancel button 
             confirmBtnClass: "btn btn-primary", // your class for styling the confirm button 
             cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
             animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
         };
         // here are poup optionsc
       this.service.viewReceivedConceptNote().subscribe(
       (res)=>res.forEach(item=>{
             const a=[]
             
             this.service.viewReceivedConceptNoteOfWaiting().subscribe(

                resp=>{
                  console.log(resp[0])
                  if (resp[0] == undefined) {
                    this.hide=false;
                  }

                  for (var i =0; i <resp.length; ++i) {
                    if (resp[i].group_id==item.group_title.group_id) {
                      a.push(item.group_title)

             this.data.push(item.group_title)
             
                       a[0]["concept_note"]="<a href="+a[0]["concept_note"]+""+">view</a>";
                       const d=a[0]["group_id"]
                        a[0]["accept"]='<button (click)="'+'accept('+d+')'+'" class="btn-primary">accept</button>';
                        a[0]["reject"]='<button (click)="'+'decline('+d+')'+'" class="btn-danger">reject</button>';
                          
                          
                       
                         
             
              
              this.length=this.data.length;
              this.onChangeTable(this.config);
                      
                    }
                 
                  }
                  
                }
               )
            
             

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

       
accept(data:any){
  this.service.updateRecomandationsOFreceivedConceptNote(data,'accept').subscribe(
      resp=>{
        this.service.updateToSupervisor(data).subscribe(
           res=>{
             alert("succesful");
             location.reload();
           }
          )
        
      }
    )
}
decline(data:any){
  this.service.updateRecomandationsOFreceivedConceptNote(data,'reject').subscribe(
      resp=>{
    this.groupid=data
        this.popup.show(this.popup.options);
      }
    )
}
 public onCellClick(data: any): any {
    if (data.column==='accept') {
      this.accept(data.row.group_id)
    }
     if (data.column==='reject') {
      this.decline(data.row.group_id)
    }
  }
sendMessageReason(){
  
  this.service.sendMessageToStudents(this.groupid,this.reason).subscribe(
resp=>{
  this.service.updateResonsForRejections(this.reason,this.groupid).subscribe(
res=>{
  alert('succsefull')
  this.popup.hide()
  location.reload();

}
    )
}
    )
  
  
  
  

}

}
