import { Component, OnInit } from '@angular/core';
import {CordinatorService} from './cordinator.service';
import {SupervisorService} from '../supervisor/supervisor.service';


@Component({
  selector: 'app-view-concept-note',
  template: `
  <div class="alert-info" *ngIf="hide">
  	<p style="height: 30px;text-align: center;font-size: 20px;">there is no rejectedConceptNote</p>
  </div>
   <div *ngIf="!hide">
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
  `,
  styles: [
`
  
 
`
  ],
  providers:[CordinatorService,SupervisorService]
  
})
export class ViewConceptNoteComponent implements OnInit {
	public rows:Array<any> = [];
	 public columns:Array<any> = [
	   {title: 'title', name: 'title'},
	   {
	     title: 'conceptNote',
	     name: 'concept_note'
	   },
	   {title: 'Reasons', name: 'reason'},
	   {title: 'Supervisor', name: 'super'},
	   {title: 'Accept', name: 'accept'}
	   
	 ];
	 public page:number = 1;
	 public itemsPerPage:number = 10;
	 public maxSize:number = 5;
	 public numPages:number = 1;
	 public length:number = 0;
	 private hide:boolean=false;

	 public config:any = {
	   paging: true,
	   sorting: {columns: this.columns},
	   filtering: {filterString: ''},
	   className: ['table-striped', 'table-bordered']
	 };

	 private data:Array<any> =[];

	 public constructor(private service:CordinatorService,private superService:SupervisorService) {
	   this.length = this.data.length;
	 }
	 public ngOnInit():void {
		this.service.viewReceivedConceptNoteOfRejected().subscribe(
           
			resp=>{
				if (resp[0]==undefined){
               this.hide=true
				}else{
				    const a=[]
				    
				
				   for (var i = 0; i < resp.length; ++i) {
					
		                a.push(resp[i].group_id)
						}

				     this.service.viewDataOfReceivedConceptNoteOfRejected(a).subscribe(
                         (res)=>res.forEach(item=>{
                         	     
                         	     
                         	     var c;
                         	      
                         	      
                         	     
                         	     	  	
                         	     		this.service.getSupervisorName(item.proposed_supervisor).subscribe(

                         	     		resp=>{
                         	     			c=resp.name;
                         	     			
                         	     			this.service.viewReasonForRejection(item.group_id).subscribe(
													resp=>{const b=[]
														this.data.push(item.group_title)
															      b.push(item.group_title)
															      	b[0]['concept_note']="<a href="+b[0]["concept_note"]+""+">view</a>";
															      	b[0]['reason']=resp.reasons;
															      	b[0]['super']=c
															      	b[0]['id']=item.group_id
															      	b[0]['accept']='<button  class="btn-primary">accept</button>';
															      
															      
															      this.length=this.data.length;
															      this.onChangeTable(this.config);

														          

													}

                         	     				)
                         	     			
                         	     	     
                         	     		}
                         	           
                         	     		)

                               }

					          ))

				
			       }
			   }
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
	   if (data.column==='accept') {
      this.accept(data.row.id)
    }
	 }
	 
	  accept(data:any){
	  	this.superService.updateRecomandationsOFreceivedConceptNote(data,'accept').subscribe(
	  	    resp=>{
	  		this.superService.cordgetSupervisorIds(data).subscribe(resp=>{
	  			
	  			      this.superService.updateToSupervisorByCoordinator(data,resp.proposed_supervisor).subscribe(
	  			         res=>{
	  				  	         	this.service.deleteStudentMessage(data).subscribe(
	  			                        resp=>{
	  			                        	alert("succesful");
	  			                        	location.reload();
	  			                        }
	  				  	         		)

	  			           
	  			         }
	  			        )
	  			      
	  			    }
	  			  )
	  		}
	  	      
	  	
	  	)
	  	
	  	         	
	  }
	 

}
