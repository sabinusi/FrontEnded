import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response,RequestOptions,Headers,URLSearchParams } from '@angular/http';

@Injectable()
export class CordinatorService {
private userData:any=JSON.parse( sessionStorage.getItem('userData'));
private id:string=this.userData["employee_id"]

  constructor(private http:Http) { }
  public try;

  public sendAnaucement(data1,data2,data3){
   	let urlSearchParams = new URLSearchParams();
  urlSearchParams.append('coordinator_employee_id', data1);
  urlSearchParams.append('title', data2);
  urlSearchParams.append('description', data2);
  let body = urlSearchParams.toString()
   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
           let options = new RequestOptions({ headers: headers });
          return this.http.post( 'http://localhost:8000/cord/postanaucemnt',body,options).map(
              (res: Response) => res.json() 
                    
          );

  }

  public updateConceptNoteControls(title:any,no:any){
    let ur=new URLSearchParams()
    ur.append('submitConceptNote',title)
    let body=ur.toString()
    let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    let options= new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:8000/std/updateConceptNote/'+no,body,options).map((resp:Response)=>resp.json());
  }
  public updateReportControls(d1,d2,d3,d4){
    let ur=new URLSearchParams()
    ur.append('sem1progress',d1)
    ur.append('sem1final',d2)
    ur.append('sem2progress',d3)
    ur.append('sem2final',d4)
    let body=ur.toString()
    let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    let options= new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:8000/cord/alowreports/1',body,options).map((resp:Response)=>resp.json());
  }
public getCurrentState(){
  return this.http.get( "http://localhost:8000/cord/currentStateOfSystem").map((resp:Response)=>resp.json());
}
 public viewReceivedConceptNoteOfRejected(){
  return this.http.get( "http://localhost:8000/super/recoamandatio?recom=reject").map((resp:Response)=>resp.json());
}
public viewDataOfReceivedConceptNoteOfRejected(data:any){
  return this.http.get( "http://localhost:8000/cord/dataofrejectedconceptnote?id="+data).map((resp:Response)=>resp.json());
}
public getSupervisorName(employeeId:any){
  return this.http.get( "http://localhost:8000/std/getsupervisorname/"+employeeId).map((resp:Response)=>resp.json());
}
public viewReasonForRejection(data:any){
  return this.http.get( "http://localhost:8000/cord/seereasonforrejection/"+data).map((resp:Response)=>resp.json());
}
public deleteStudentMessage(data:any){
  return this.http.delete( "http://localhost:8000/cord/destroystdmessage/"+data).map((resp:Response)=>resp.json());
}
public ViewSuperVisorWithExperties(){
  return this.http.get("http://localhost:8000/std/supervisors").map(
(res:Response)=>res.json()
);
}
public updateProfilePic(file:any){
  let urlSearchParams = new FormData()
  urlSearchParams.append('profile_picture', file);

  let body = urlSearchParams;

    return this.http.put('http://localhost:8000/cord/profilePic/'+this.id,body).map((resp:Response)=>resp.json());
}
public updateName(name:string){
    let ur=new URLSearchParams()
    ur.append('name',name)
    let body=ur.toString()
    let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    let options= new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:8000/cord/UpdateName/'+this.id,body,options).map((resp:Response)=>resp.json());
  }
  public updateEmail(name:string){
    let ur=new URLSearchParams()
    ur.append('email',name)
    let body=ur.toString()
    let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    let options= new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:8000/cord/UpdateEmail/'+this.id,body,options).map((resp:Response)=>resp.json());
  }
   public updatePassword(name:string){
    let ur=new URLSearchParams()
    ur.append('password',name)
    let body=ur.toString()
    let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    let options= new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:8000/cord/UpdatePassword/'+this.id,body,options).map((resp:Response)=>resp.json());
  }
  public refreshCordinator(){
    return this.http.get( "http://localhost:8000/cord/refreshCordinator?id="+this.id).map((resp:Response)=>resp.json());
  }
  public addGroup(data1,data2,data3,data4,data5,data6){
    let URLSearchParams = new FormData()
    URLSearchParams.append('firstMenber', data1);
    URLSearchParams.append('secondMember', data2);
    URLSearchParams.append('thirdMember', data3);
    URLSearchParams.append('fourthMember', data4);
    URLSearchParams.append('fifthMember', data5);
    URLSearchParams.append('sixthMember', data6);
    
    let body=URLSearchParams;
    return this.http.post('http://localhost:8000/cord/CreateSupervisorPanel',body).map(
        (res:Response)=> res.json()
    );
  }
}
