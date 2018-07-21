import { Component, OnInit } from '@angular/core';
import {SupervisorService} from './supervisor.service';

@Component({
  selector: 'app-submited-reports',
  template: `
 
  <ng-table [config]="config"
            (tableChanged)="onChangeTable(config)"
            (cellClicked)="onCellClick($event)"
            [rows]="rows" [columns]="columns">
  </ng-table>
  
  `,
  styles: [
`

`
  ],
  providers:[SupervisorService]
})
export class SubmitedReportsComponent implements OnInit {

  public rows:Array<any> = [];
    public columns:Array<any> = [
      {title: 'GgroupNo', name: 'group_id'},
      {
        title: 'Title',
        name: 'title',
        
      },
      {title: 'Sem1Prog',  name: 'semister1_progress'},
      {title: 'Sem1Final', name: 'semister1_final'},
      {title: 'Sem2Prog', name: 'semister2_progress'},
      {title: 'Sem2Final', name: 'semister2_Final'}
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

    public constructor(private service:SupervisorService) {
      this.length = this.data.length;
    }

    public ngOnInit():void {
    	this.service.SubmitedReports().subscribe(
    		(resp)=>resp.forEach(item=>{
    			const a=[]
    			a.push(item.group_title)
    			
    			this.data.push(item.group_title)
    			if (a[0]["semister1_progress"]==null) {
    				a[0]["semister1_progress"]="<p class='glyphicon glyphicon-file'>empty</p>"
    			}else{
    			     a[0]["semister1_progress"]="<a  href="+a[0]["semister1_progress"]+""+">read</a>";	
    			}
    			if (a[0]["semister1_final"]==null) {
    				a[0]["semister1_final"]="<p class='glyphicon glyphicon-file'>empty</p>"
    			}else{
    			     a[0]["semister1_final"]="<a  href="+a[0]["semister1_final"]+""+">read</a>";	
    			}
    			if (a[0]["semister2_progress"]==null) {
    				a[0]["semister2_progress"]="<p class='glyphicon glyphicon-file'>empty</p>"
    			}else{
    			     a[0]["semister2_progress"]="<a class='btn btn-primary' href="+a[0]["semister2_progress"]+""+">read</a>";	
    			}
    			if (a[0]["semister2_Final"]==null) {
    				a[0]["semister2_Final"]="<p class='glyphicon glyphicon-file'>empty</p>"
    			}else{
    			     a[0]["semister2_Final"]="<a class='btn btn-primary' href="+a[0]["semister2_Final"]+""+">read</a>";	
    			}
    			
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
      
    }

}
