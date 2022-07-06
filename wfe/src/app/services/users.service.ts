import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { API_URL } from '../constants/constants';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<User[]>(API_URL + 'User');
  }

  deleteUser(user: User) {
    return this.httpClient.delete(API_URL + 'User/' + user.id);
  }

  updateUser(user: User) {
    return this.httpClient.put(API_URL + 'User/' + user.id, user);
  }
}
