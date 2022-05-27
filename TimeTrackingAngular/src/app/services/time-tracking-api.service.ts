import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants/constants';
import { TimeTracking } from '../models/timeTracking';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingApiService {

  constructor(private httpClient: HttpClient) { }

  getTimeTracking (){
      return this.httpClient.get<TimeTracking[]>(`${API_URL}/timeTracking`);
  }

  addTimeTracking (timeTracking: TimeTracking){
    return this.httpClient.post<TimeTracking>(`${API_URL}/timeTracking`, timeTracking);
  }

  updateTimeTracking (timeTracking: TimeTracking){
    console.log('update service')
    return this.httpClient.put<TimeTracking>(`${API_URL}/timeTracking/${timeTracking.id}`, timeTracking);
  }

  deleteTimeTracking (timeTracking: TimeTracking){
    return this.httpClient.delete<TimeTracking>(`${API_URL}/timeTracking/${timeTracking.id}`);
  }

  filterTimeTracking (timeTracking: TimeTracking){
    if (timeTracking.date != null && timeTracking.hours != null){
       return this.httpClient.get<TimeTracking[]>(`${API_URL}/timeTracking?hours=${timeTracking.hours}&date=${timeTracking.date}`);
    } else if (timeTracking.date != null){
       return this.httpClient.get<TimeTracking[]>(`${API_URL}/timeTracking?date=${timeTracking.date}`);
    } else if (timeTracking.hours != null){
      return this.httpClient.get<TimeTracking[]>(`${API_URL}/timeTracking?hours=${timeTracking.hours}`);
   }
   return this.httpClient.get<TimeTracking[]>(`${API_URL}/timeTracking`);
  }
}
