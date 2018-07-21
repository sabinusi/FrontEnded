import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers,URLSearchParams } from '@angular/http';
@Injectable()
export class SupervisorService {

  constructor(private http:Http) { }
  private userData:any=JSON.parse( sessionStorage.getItem('userData'));
  public employeID:string=this.userData['employee_id']

  public viewReceivedConceptNote(){
  return this.http.get( "http://localhost:8000/super/getileandConceptNote?employeeID="+this.employeID).map((resp:Response)=>resp.json());
}
public updateRecomandationsOFreceivedConceptNote(groupid:any,recomandation){
	let ur=new URLSearchParams()
	ur.append('recomandation',recomandation)
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/super/updateconeptnoterecomandations/'+groupid,body,options).map((resp:Response)=>resp.json());
}
  
 public viewReceivedConceptNoteOfWaiting(){
  return this.http.get( "http://localhost:8000/super/recoamandatio?recom=waiting").map((resp:Response)=>resp.json());
}
public updateToSupervisor(groupid:any){
	let ur=new URLSearchParams()
	ur.append('supervisor_employee_id',this.employeID)
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/std/updatesupervisor/'+groupid,body,options).map((resp:Response)=>resp.json());
}
public sendMessageToStudents(data1,data2){
  let urlSearchParams = new URLSearchParams();
urlSearchParams.append('student_group_id', data1);
urlSearchParams.append('message_from_supervisor', data2);

let body = urlSearchParams.toString()
 let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
         let options = new RequestOptions({ headers: headers });
        return this.http.post( 'http://localhost:8000/super/sendmessage',body,options).map(
            (res: Response) => res.json() 
                  
        );

}
 public updateResonsForRejections(title:any,no:any){
    let ur=new URLSearchParams()
    ur.append('reasons',title)
    let body=ur.toString()
    let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
    let options= new RequestOptions({ headers: headers });
    return this.http.put('http://localhost:8000/super/sendmessageforRejection/'+no,body,options).map((resp:Response)=>resp.json());
  }
  public cordgetSupervisorIds(data:any){
    return this.http.get( "http://localhost:8000/std/viewsupervisorsid/"+data).map((resp:Response)=>resp.json());
  }
  public updateToSupervisorByCoordinator(groupid:any,employeId:any){
  	let ur=new URLSearchParams()
  	ur.append('supervisor_employee_id',employeId)
  	let body=ur.toString()
  	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  	let options= new RequestOptions({ headers: headers });
  	return this.http.put('http://localhost:8000/std/updatesupervisor/'+groupid,body,options).map((resp:Response)=>resp.json());
  }
   public viewReceivedConceptNoteOfAccept(){
    return this.http.get( "http://localhost:8000/super/recoamandatio?recom=accept").map((resp:Response)=>resp.json());
  }
   public viewReceivedConceptNoteOfAcceptData(data:any){
    return this.http.get( "http://localhost:8000/super/viewMyGroup?id="+data).map((resp:Response)=>resp.json());
  }
  public viewReceivedMessageFromStudent(){
    return this.http.get( "http://localhost:8000/super/viewMyMessage?id="+this.employeID).map((resp:Response)=>resp.json());
  }
  public SupervisorgetStudentTitle(data:any){
  return this.http.get( "http://localhost:8000/std/messagedata/"+data).map((resp:Response)=>resp.json());
}
public updateReadedMessages(){
  return this.http.get( "http://localhost:8000/super/updatereadedmessages?id="+this.employeID).map((resp:Response)=>resp.json());
}
public UnreadedReadedMessages(){
  return this.http.get( "http://localhost:8000/super/UnreadedMessages?id="+this.employeID).map((resp:Response)=>resp.json());
}
public SubmitedReports(){
  return this.http.get( "http://localhost:8000/super/submitedreports?id="+this.employeID).map((resp:Response)=>resp.json());
}
public updateEmail(email:string){
  let ur=new URLSearchParams()
  ur.append('email',email)
  let body=ur.toString()
  let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options= new RequestOptions({ headers: headers });
  return this.http.put('http://localhost:8000/super/updateEmail/'+this.employeID,body,options).map((resp:Response)=>resp.json());
}
public updateName(name:string){
  let ur=new URLSearchParams()
  ur.append('name',name)
  let body=ur.toString()
  let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options= new RequestOptions({ headers: headers });
  return this.http.put('http://localhost:8000/super/updateName/'+this.employeID,body,options).map((resp:Response)=>resp.json());
}
public updatePhoneNo(phone:string){
  let ur=new URLSearchParams()
  ur.append('phone_number',phone)
  let body=ur.toString()
  let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options= new RequestOptions({ headers: headers });
  return this.http.put('http://localhost:8000/super/UpdatePhoneNo/'+this.employeID,body,options).map((resp:Response)=>resp.json());
}
public updateExpertis(exper:string){
  let ur=new URLSearchParams()
  ur.append('experties',exper)
  let body=ur.toString()
  let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options= new RequestOptions({ headers: headers });
  return this.http.put('http://localhost:8000/super/UpdateExperties/'+this.employeID,body,options).map((resp:Response)=>resp.json());
}
public updateOfficeNumber(exper:string){
  let ur=new URLSearchParams()
  ur.append('ofice_number',exper)
  let body=ur.toString()
  let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options= new RequestOptions({ headers: headers });
  return this.http.put('http://localhost:8000/super/UpdateOfficeNumber/'+this.employeID,body,options).map((resp:Response)=>resp.json());
}
public updateProfileImage(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('profile_picture', file);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/super/updateprofileImage/'+this.employeID,body).map((resp:Response)=>resp.json());
}
public updateSuperPassword(name:string){
  let ur=new URLSearchParams()
  ur.append('password',name)
  let body=ur.toString()
  let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  let options= new RequestOptions({ headers: headers });
  return this.http.put('http://localhost:8000/super/updatePassword/'+this.employeID,body,options).map((resp:Response)=>resp.json());
}
public refreshSupervisorDetail(){
  return this.http.get( "http://localhost:8000/super/RefreshSuper?id="+this.employeID).map((resp:Response)=>resp.json());
}
addGroup(data1,data2,data3,data4,data5,data6){
  let URLSearchParams = new FormData()
  URLSearchParams.append('firstMenber', data1);
  URLSearchParams.append('secondMember', data2);
  URLSearchParams.append('thirdMember', data3);
  URLSearchParams.append('fourthMember', data4);
  URLSearchParams.append('fifthMember', data5);
  URLSearchParams.append('sixthMember', data6);
  
  let body=URLSearchParams;
  return this.http.post('http://localhost:8000/super/C',body).map(
      (res:Response)=> res.json()
  );
}
}
