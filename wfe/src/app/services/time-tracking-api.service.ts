import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { TimeTracking } from '../models/timeTracking';
import { SubItem} from '../models/subItem'
import { UsersService } from './users.service';
import { User } from '../models/user';
import { StorageService } from './storage.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingApiService {
  usersList: any;
  wantedUserId: any;
  userId: number = 0;
  constructor(private httpClient: HttpClient, private userService: UsersService, private storage: StorageService) { }

  findUserId(){
    const token =  localStorage.getItem("token") != null ? localStorage.getItem("token") : ""
    const tokenDecoded = this.getDecodedAccessToken(token)
    this.userId = + tokenDecoded.userId;
    }

    getDecodedAccessToken(token: any): any {
      try {
        return jwt_decode(token);
      } catch(Error) {
        return null;
      }
    }
  
  getTimeTracking (){
      return this.httpClient.get<TimeTracking[]>(`${API_URL}timeTracking`);
  }

  addTimeTracking (timeTracking: TimeTracking){

    this.findUserId();

    timeTracking = {...timeTracking, userId: this.userId}
    
    return this.httpClient.post<TimeTracking>(`${API_URL}timeTracking`, timeTracking);
  }

  updateTimeTracking (timeTracking: TimeTracking){
    return this.httpClient.put<TimeTracking>(`${API_URL}timeTracking/${timeTracking.id}`, timeTracking);
  }

  deleteTimeTracking (timeTracking: TimeTracking){
    return this.httpClient.delete<TimeTracking>(`${API_URL}timeTracking/${timeTracking.id}`);
  }
  getTimeTrackingSubItem (timeTracking: TimeTracking){
    return this.httpClient.get<SubItem[]>(`${API_URL}timeTrackingSubitem/${timeTracking.id}`);
  }


  filterTimeTracking (timeTracking: TimeTracking){
    if (timeTracking.date != null && timeTracking.hours != null){
       return this.httpClient.get<TimeTracking[]>(`${API_URL}timeTracking?hours=${timeTracking.hours}&date=${timeTracking.date}`);
    } else if (timeTracking.date != null){
       return this.httpClient.get<TimeTracking[]>(`${API_URL}timeTracking?date=${timeTracking.date}`);
    } else if (timeTracking.hours != null){
      return this.httpClient.get<TimeTracking[]>(`${API_URL}timeTracking?hours=${timeTracking.hours}`);
   }
   return this.httpClient.get<TimeTracking[]>(`${API_URL}timeTracking`);
  }

  findActivityItem(timeTrackingId?: number) {
    return this.httpClient.get<TimeTracking>(`${API_URL}timeTracking/${timeTrackingId}`);
  }

  addTimeTrackingSubItem (timeTrackingSubitem: SubItem){
    return this.httpClient.post<SubItem>(`${API_URL}timeTrackingSubitem`, timeTrackingSubitem);
  }
}
