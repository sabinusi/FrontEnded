import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {StudentService} from './student.service';

@Component({
  selector: 'app-project-archive',
  template: `
    <div class="row" style="margin-bottom: 5px;">
      <div class="col-md-12">
        
        <form role="search" 
        #for="ngForm" (ngSubmit)="search(for.value)">
            <div class="input-group add-on">
              <input class="form-control" placeholder="Search a project title" name="title"  type="text"  required  ngModel>
              <div class="input-group-btn">
                <button class="btn btn-default"  type="submit"><i class="glyphicon glyphicon-search"></i></button>
              </div>
            </div>
          </form>

        
      </div>
    </div>
   <div class="row "  >
     <div class="col-md-12" *ngIf="hide">
   
      <ng-table [config]="config"
                (tableChanged)="onChangeTable(config)"
                
                [rows]="rows" [columns]="columns">
      </ng-table>

     
     </div>
     <div class="alert alert-danger" style="text-align: center;height: 40px;" *ngIf="er">
       <button class="close" (click)="hideE()"  aria-label="close">&times;</button>
        No match has found for that title
       
     </div>
   </div>

  `,
  styles: [],
  providers:[StudentService]
})
export class ProjectArchiveComponent implements OnInit {
  public rows:Array<any> = [];
    public columns:Array<any> = [
      {title: 'Title', name: 'title'},
      {
        title: 'ConceptNote',
        name: 'conceptNote',
        
      },
      {title: 'Year', name: 'year'},
     
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
      className: ['table-striped', 'table-bordered','ng-table','table-hover']
    };

    private data:Array<any> = [];

    public constructor(private service:StudentService ) {
      this.length = this.data.length;
    }

    public ngOnInit():void {
 

      
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

  private hide:boolean=false;
  private er:boolean=false;
  hideE(){
  this.er=false
}
search(data:any){
  this.data=[]
   this.length=this.data.length;
   this.onChangeTable(this.config);

  this.service.getPastProjects(data.title).subscribe(
  (res)=>{
      if (res.length ==0) {
             this.er=true;
             this.hide=false
           }else{
             this.hide=true
             this.er=false
             res.forEach(item=>{
                const b=[]

                 this.data=res;
                 b.push(item)
                 
                 
                      b[0]["conceptNote"]="<a href="+b[0]["conceptNote"]+""+">view</a>";
                  
                  
                  this.length=this.data.length;
                  this.onChangeTable(this.config);

                })
           }
   
 

       }

    )
 

}
}
