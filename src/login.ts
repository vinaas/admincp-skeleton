import { Aurelia, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import {AuthService} from 'aurelia-auth';

@inject(AuthService, Aurelia, Router )

export class Login{
	constructor(private auth:AuthService,private aurelia :Aurelia, private router: Router ){

	};

	heading = 'Login';
	
	email='';
	password='';
  login(){
     this.router.navigate('/');
     this.aurelia.setRoot('app')
      .then(() => {
                this.router.navigate('/');
            });;
    //   var creds = "grant_type=password&email=" + this.email + "&password=" + this.password;
		// return this.auth.login(this.email, this.password)
    //     //return this.auth.login(creds)
		// .then(response=>{
    //   alert("login success");
		// 	console.log("success logged " + response);
    //    this.aurelia.setRoot('app');
		// })
		// .catch(err=>{
    //   alert("login failure")
    //         err.json().then(function(e){
    //         console.log("login failure : " + e.message);    
    //         });
			
		// });
  }
}
