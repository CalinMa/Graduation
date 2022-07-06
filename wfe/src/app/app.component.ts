import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { StorageService } from './services/storage.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TimeTrackingAngular';
  showButton = false;
  userName: string = "";
  
  welcomeGreetingCheck = false;
  

  constructor(private _snackBar: MatSnackBar, private router:Router, public loginService: LoginService, private storage: StorageService) { }

  ngOnInit(): void {
   this.checkLogin();
    };

    findUserName(){
      const token =  localStorage.getItem("token") != null ? localStorage.getItem("token") : ""
      const tokenDecoded = this.getDecodedAccessToken(token)
      this.userName = tokenDecoded.nameid
    
    }
    getDecodedAccessToken(token: any): any {
      try {
        return jwt_decode(token);
      } catch(Error) {
        return null;
      }
    }
    checkLogin (){
      this.findUserName()
    
      if (this.userName != "" || this.userName != undefined){
        this.welcomeGreetingCheck = true;
       
      } else {
        this.welcomeGreetingCheck = false;
      }
      
      if (localStorage.getItem("token") != null){
        this.showButton = true;
      } else {
        this.showButton = false;
        this.welcomeGreetingCheck = false;
      }
    }

  onLogout(){
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.storage.resetScope();
    this.welcomeGreetingCheck = false;
    this.showButton = false;
     this.loginService.role = '';

    this.router.navigate(['/login']);
    this._snackBar.open("You are now logged out. ", "Ok", {
      verticalPosition: 'top',
      duration: 6 * 1000,
    });
  }
}
