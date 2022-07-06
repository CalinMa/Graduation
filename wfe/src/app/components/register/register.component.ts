import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {RegisterService} from "../../services/register.service";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isSuperAdmin = false;
  userRole: string = "";
  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private _snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
   this.findUserName();
  }

  RegisterForm = this.formBuilder.group({
    userName: ['', [Validators.required]],
    name: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    roleId: ['', [Validators.required]],
  });

  get userName() {
    return this.RegisterForm.get('userName');
  }
  get name() {
    return this.RegisterForm.get('name');
  }
  get firstName() {
    return this.RegisterForm.get('firstName');
  }
  get email() {
    return this.RegisterForm.get('email');
  }

  get password() {
    return this.RegisterForm.get('password');
  }

  registerUser() {

    this.registerService.register(this.RegisterForm.value).subscribe((resultOfLogin) => {
 
       this.router.navigate(['/users']);
        this._snackBar.open(resultOfLogin.status , "Ok", {
        verticalPosition: 'top',
        duration: 6 * 1000,
      });
      }, (error) => {
      
        this._snackBar.open("Register FAILED  due to " + error.error , "Ok", {
          verticalPosition: 'top',
          duration: 6 * 1000,
        });
      }

    );
  }

  findUserName(){
    const token =  localStorage.getItem("token") != null ? localStorage.getItem("token") : ""
    const tokenDecoded = this.getDecodedAccessToken(token)
    this.userRole = tokenDecoded.userRole

    if (this.userRole === "superadmin"){
      this.isSuperAdmin = true;
    }
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }


}
