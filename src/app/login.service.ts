	import { Injectable } from '@angular/core';
	import 'rxjs/add/operator/map';
	
	import { Http, Response } from '@angular/http';

	@Injectable()
	export class LoginServiceService {

	  constructor(private http:Http) { }
	  

	

	  getUser(userid:any,pass:any){

	    return this.http.get( "http://localhost:8000/login/l?id="+userid+"&&pass="+pass ).map(
	            (res: Response) => res.json()
	            
	                  
	        );

	}
	recoverPassword(data:any){
		return this.http.get( "http://localhost:8000/login/getpassword?id="+data ).map(
		        (res: Response) => res.json()
		        
		              
		    );
	}
	returnEmail(data:any){
		return this.http.get( "http://localhost:8000/std/email?id="+data ).map(
		        (res: Response) => res.json()
		        
		              
		    );
	}
	}
	// 