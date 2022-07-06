import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import {UserForAuthentication} from '../models/login';

import {Router} from "@angular/router";
import {tap} from "rxjs";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  role: string = '';

  constructor(private httpClient: HttpClient, private  router: Router, private storage: StorageService) {
    this.role = localStorage.getItem('role') ?? '';
  }

  isAuthenticatedloginService():boolean{
    return  localStorage.getItem('token') !==null;
  }
  login(login: UserForAuthentication) {
    
    let response = this.httpClient.post<any>(`${API_URL}Token/login`, login);

    return response.pipe(tap(response => {
      this.role = response.roleName;
    }));
  }
  public redirectToLogin(): void {
    this.router.navigate(['/login']);

  }
}
