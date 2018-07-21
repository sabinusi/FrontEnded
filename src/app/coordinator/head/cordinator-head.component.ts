import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cordinator-head',
  templateUrl: './cordinator-head.component.html',
  styleUrls: ['./cordinator-head.component.css']
})
export class CordinatorHeadComponent implements OnInit {
private userData:any=JSON.parse( sessionStorage.getItem('userData'));
private picUrl:string=this.userData["profile_picture"]
private sname:string=this.userData["name"];
  constructor() { }

  ngOnInit() {
  }

}
