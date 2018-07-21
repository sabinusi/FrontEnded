import { Component, OnInit } from '@angular/core';
import {Popup} from 'ng2-opd-popup';
import {CordinatorService} from './cordinator.service';
import {StudentService} from '../student/student.service';



@Component({
  selector: 'app-assign-group',
  template: `
<a class="pull-right" (click)="chooseSupervisor()" >Create supervisor group</a>   
<!-- create popup for choosing supervisor -->

  <popup >
  
  <table class='table'>
      <thead>
          <tr>
              <th>
                
              <th>Suprvisor name</th>
              <th>Experties</th>
              
    
          </tr>
      </thead>
      <tbody>
        <tr>
              <td>
              
              <a class="md-btn md-btn-primary"
   [class.disabled]="isClickedOnce"
   (click)="isClickedOnce = true">ADD</a>
              
              </td>
              
        </tr>  
      </tbody>
  </table>
  </popup>
  
<!-- create popup for choosing supervisor -->

  `,
  styles: [
`
  

`
  ],
  providers:[CordinatorService]

})
export class AssignGroupComponent implements OnInit {
  public rows:Array<any> = [];
   public columns:Array<any> = [
     {title: 'Suprvisor Name', name: 'name'},
     {
       title: 'Experties',
       name: 'experties',
       
     }
     
     
   ];
  public length:number = 0;
  // @ViewChild('popup2') popup2: Popup;
  
  private data:Array<any>=[];
  constructor(private popup:Popup,private service:CordinatorService) {
    this.length = this.data.length;
   }

   public ngOnInit():void {
    this.service.ViewSuperVisorWithExperties().subscribe((res)=>res.forEach(item=>{

      this.data.push(item);
      this.length=this.data.length;
    
    }))
    
  }

chooseSupervisor(){
  
    /*
      this.service.addGroup(form.value.firstMember,form.value.secondMember,form.value.thirdMember,form.value.fourthMember,form.value.fifthMember,form.value.sixthMember)
      
      .subscribe(
        resp =>alert('Panel created!!'),
        error=>alert('error')
      );
     form.reset();
     */
  
  this.popup.show(this.popup.options);
  this.popup.options = {
    header: "Choose from the below list",
    color: "blue", // red, blue.... 
    widthProsentage: 80, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
    confirmBtnContent:"Ok",
    cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnClass: "btn btn-primary", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-danger", // you class for styling the cancel button 
    animation: "bounceInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
};
}
}
