// import {Component, NgModule, OnInit} from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from "@angular/material/snack-bar";
import { LoginService } from 'src/app/services/login.service'; 
import {Router} from "@angular/router";
import { AppComponent } from 'src/app/app.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar, private router:Router,
    private loginChecker: AppComponent) {
  }
  ngOnInit(): void {
    
  }

  LoginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get email() { return this.LoginForm.get('email'); }
  get password() { return this.LoginForm.get('password'); }
 


  onSubmit() {
    this.loginService.login(this.LoginForm.value).subscribe((resultOfLogin) => {

      var roleName = resultOfLogin.roleName;
     
      localStorage.setItem("token", resultOfLogin.token);

      localStorage.setItem("role", roleName)


      if(roleName === "user") {
          this.router.navigate(['/time-tracking']);
        } else if(roleName === "admin") {
          this.router.navigate(['/users']);
        }  else if(roleName === "superadmin") {
          this.router.navigate(['/users']);
        }
        this.loginChecker.checkLogin();

    }, (error) => {

        this._snackBar.open("Login FAILED  due to " + error.error, "Ok", {
          verticalPosition: 'top',
          duration: 6 * 1000,
        });
      }

    );

  }

  

}
// /**
//  * @title Basic progress-spinner
//  */
//  @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
// })
// export class ProgressSpinnerOverviewExample {}