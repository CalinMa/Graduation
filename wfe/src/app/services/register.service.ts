import { Injectable } from '@angular/core';
import {UserForAuthentication} from "../models/login";
import { API_URL } from '../constants/constants';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import { User } from '../models/user'; 


@Injectable({
  providedIn: 'root'
})


export class RegisterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private  router: Router) { }

  register(user: User) {
    // console.log("what is being sent : "+user.userName)
    // console.log("what is being sent : "+user.name)
    // console.log("what is being sent : "+user.firstName)
    // console.log("what is being sent : "+user.email)
    // console.log("what is being sent : "+user.password)

    const userAsjson = JSON.stringify(user);

    let response = this.httpClient.post<any>(`${API_URL}Token/register`, userAsjson, { headers: {'Content-Type': 'application/json','accept':'*/*'}});

    return response;
  }

}
