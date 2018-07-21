import { Injectable } from '@angular/core';


import { Http, Response,RequestOptions,Headers,URLSearchParams } from '@angular/http';

@Injectable()
export class StudentService {

  constructor(private http:Http) { 
 
  }
  

  private userData:any=JSON.parse( sessionStorage.getItem('userData'));
  public name:string=this.userData['firstname']
  public registrationsnumber:string=this.userData['student_reg_no']
  public groupno:string=this.userData['studentgroup']
  public sgroupno(){
    if (this.groupno==null) {
      return this.groupno='0';
    }else return this.groupno
  }

getAnaucements(){
  return this.http.get( "http://localhost:8000/std/annaucements" ).map(
              (res: Response) => res.json());
  }

  public viewSuperVisors(){

    return this.http.get("http://localhost:8000/std/supervisors").map(
  (res:Response)=>res.json()
      );
  }
  public ViewSuperVisorWithExperties(){
  	    return this.http.get("http://localhost:8000/std/supervisors").map(
  (res:Response)=>res.json()
      );
  }
  public ListOfnoneGroupOwners(){
  		    return this.http.get("http://localhost:8000/std/getNameAndReg").map(
  	(res:Response)=>res.json()
  	    );
  }
  public greatGroup(data1,data2,data3,data4,data5,data6){
   	let urlSearchParams = new FormData()
  urlSearchParams.append('first_member_reg_no', data1);
  urlSearchParams.append('second_member_reg_no', data2);
  urlSearchParams.append('third_member_reg_no', data3);
  urlSearchParams.append('group_title.concept_note', data4);
  urlSearchParams.append('group_title.title', data5);
  urlSearchParams.append('proposed_supervisor', data6);
  let body = urlSearchParams;
   
          return this.http.post( 'http://localhost:8000/std/creategoupandconceptnote',body).map(
              (res: Response) => res.json() 
                    
          );
  }

public getId(id:any){

	return this.http.get('http://localhost:8000/std/getid?id='+id).map((resp:Response)=>resp.json());
}
public updateGroupId(id:any,no:any){
	let ur=new URLSearchParams()
	ur.append('studentgroup',id)
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/std/updategroupid/'+no+'/',body,options).map((resp:Response)=>resp.json());
}

public updateTitle(title:any,no:any){
	let ur=new URLSearchParams()
	ur.append('title',title)
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/std/updatetile/'+no,body,options).map((resp:Response)=>resp.json());
}

public getAllStudentGroupDatas(id:any){

	return this.http.get('http://localhost:8000/std/listGroupsData?no='+id).map((resp:Response)=>resp.json());
}

public updateConceptNote(data1,data2){
 	let urlSearchParams = new FormData()
urlSearchParams.append('concept_note', data1);

let body = urlSearchParams;
 
        return this.http.put( 'http://localhost:8000/std/conceptNoteUpdate/'+data2,body).map(
            (res: Response) => res.json() 
                  
        );
}
public updateProposedSuper(title:any,no:any){
	let ur=new URLSearchParams()
	ur.append('proposed_supervisor',title)
	let body=ur.toString()
	let headers=new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
	let options= new RequestOptions({ headers: headers });
	return this.http.put('http://localhost:8000/std/update_proposed_supervisor/'+no,body,options).map((resp:Response)=>resp.json());
}
public getConceptNoteStatus(){

	return this.http.get('http://localhost:8000/std/supervisorcontrolConceptNote').map((resp:Response)=>resp.json());
}
public getPastProjects(data:string){
	return this.http.get('http://localhost:8000/std/pastprojects?t='+data).map((resp:Response)=>resp.json());
}
public getStatusOfReportsSubmission(){
	return this.http.get('http://localhost:8000/std/listgroupcontrols').map((resp:Response)=>resp.json());
}
public seeReports(){
	return this.http.get('http://localhost:8000/std/seereports?gno='+this.groupno).map((resp:Response)=>resp.json());
}

public updateSemister2Final(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('semister2_Final', file);

let body = urlSearchParams;
	return this.http.put('http://localhost:8000/std/updatesemister2final/'+this.groupno,body).map((resp:Response)=>resp.json());
}
public updateSemister1Progress(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('semister1_progress', file);

let body = urlSearchParams;
	return this.http.put('http://localhost:8000/std/updateSemis1ProgressReport/'+this.groupno,body).map((resp:Response)=>resp.json());
}

public updateSemister1Final(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('semister1_final', file);

let body = urlSearchParams;
	return this.http.put('http://localhost:8000/std/updatesemister1final/'+this.groupno,body).map((resp:Response)=>resp.json());
}
public updateSemister2Progress(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('semister2_progress', file);

let body = urlSearchParams;
	return this.http.put('http://localhost:8000/std/updatesemister2progress/'+this.groupno,body).map((resp:Response)=>resp.json());
}

public getStudentProfile(){
	return this.http.get('http://localhost:8000/std/profile?gno='+this.groupno).map((resp:Response)=>resp.json());
}
public getStudentNames(no){
	return this.http.get('http://localhost:8000/std/getnames?sno='+no).map((resp:Response)=>resp.json());
}
public updateSecondMemberOfGroup(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('second_member_reg_no', file);

let body = urlSearchParams;
	return this.http.put('http://localhost:8000/std/updatesecondmember/'+this.groupno,body).map((resp:Response)=>resp.json());
}
public updateSecondMemberOfStudentGroup(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('studentgroup', file);

let body = urlSearchParams;
  return this.http.put('http://localhost:8000/std/updateStudentgroup/'+this.registrationsnumber,body).map((resp:Response)=>resp.json());
}
public updateThirdMemberOfGroup(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('third_member_reg_no', file);

let body = urlSearchParams;

	return this.http.put('http://localhost:8000/std/updatethirdmember/'+this.groupno,body).map((resp:Response)=>resp.json());
}
public updateProfileImage(file:any){
let urlSearchParams = new FormData()
urlSearchParams.append('profile_picture', file);

let body = urlSearchParams;

	return this.http.put('http://localhost:8000/std/profilepic/'+this.registrationsnumber,body).map((resp:Response)=>resp.json());
}
public updatePassword(file){
let urlSearchParams = new FormData()
urlSearchParams.append('password', file);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/std/updatepassword/'+this.registrationsnumber,body).map((resp:Response)=>resp.json());
}
public updateEmail(file){
let urlSearchParams = new FormData()
urlSearchParams.append('email', file);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/std/updateEmail/'+this.registrationsnumber,body).map((resp:Response)=>resp.json());
}
public getSuperVisorId(name:any,exp:any){
  return this.http.get( "http://localhost:8000/std/getsupervisorid/?name="+ name +"&&exp="+exp ).map((resp:Response)=>resp.json());
}
public getNewStudentDatas(){
  return this.http.get( "http://localhost:8000/std/getnewstudentdata/"+this.registrationsnumber).map((resp:Response)=>resp.json());
}
public getSupervisorWithExpertieUsingEmployeeId(employeeId:any){
  return this.http.get( "http://localhost:8000/std/getMysupervisor/"+employeeId).map((resp:Response)=>resp.json());
}

public greatConceptNoteTosupervisor(data1,data2){
  let urlSearchParams = new FormData()
urlSearchParams.append('supervisor_employee_id', data1);
urlSearchParams.append('group_id', data2);

let body = urlSearchParams;
 
        return this.http.post( 'http://localhost:8000/super/createSupervisorConceptNote',body).map(
            (res: Response) => res.json() 
                  
        );
}
public getSupervisorName(employeeId:any){
  return this.http.get( "http://localhost:8000/std/getsupervisorname/"+employeeId).map((resp:Response)=>resp.json());
}
public getSupervisorMessages(){
  return this.http.get( "http://localhost:8000/std/viewsupervisormessage/?group_id="+this.sgroupno()).map((resp:Response)=>resp.json());
}
public getSupervisorIds(){
  return this.http.get( "http://localhost:8000/std/viewsupervisorsid/"+this.sgroupno()).map((resp:Response)=>resp.json());
}

public getStudentTitle(){
  return this.http.get( "http://localhost:8000/std/messagedata/"+this.sgroupno()).map((resp:Response)=>resp.json());
}
public messageToSupervisor(data1,data2,data4){
  let urlSearchParams = new FormData()
urlSearchParams.append('student_title', data1);
urlSearchParams.append('message_from_student', data2);
urlSearchParams.append('group_id', this.groupno);
urlSearchParams.append('student_names', this.name);
urlSearchParams.append('employee_id', data4);

let body = urlSearchParams;
 
        return this.http.post( 'http://localhost:8000/super/createmessageforsupervisor',body).map(
            (res: Response) => res.json() 
                  
        );
}
public updateFirstname(file){
let urlSearchParams = new FormData()
urlSearchParams.append('firstname', file);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/std/updatefirstname/'+this.registrationsnumber,body).map((resp:Response)=>resp.json());
}
public updateLastname(file){
let urlSearchParams = new FormData()
urlSearchParams.append('lastname', file);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/std/updatelastname/'+this.registrationsnumber,body).map((resp:Response)=>resp.json());
}
public updateCourse(file){
let urlSearchParams = new FormData()
urlSearchParams.append('course', file);

let body = urlSearchParams;

  return this.http.put('http://localhost:8000/std/updatecourse/'+this.registrationsnumber,body).map((resp:Response)=>resp.json());
}
public refreshStudent(){
  return this.http.get( "http://localhost:8000/std/RefreshStudent?id="+this.registrationsnumber).map((resp:Response)=>resp.json());
}

}
