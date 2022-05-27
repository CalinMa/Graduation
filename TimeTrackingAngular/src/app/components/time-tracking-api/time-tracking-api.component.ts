import { Component, OnInit } from '@angular/core';
import { TimeTracking } from 'src/app/models/timeTracking';
import { TimeTrackingApiService } from 'src/app/services/time-tracking-api.service';

@Component({
  selector: 'app-time-tracking-api',
  templateUrl: './time-tracking-api.component.html',
  styleUrls: ['./time-tracking-api.component.scss']
})
export class TimeTrackingApiComponent implements OnInit {
  newTimeTracking: TimeTracking = {};
  updTimeTracking: TimeTracking = {};
  delTimeTracking: TimeTracking = {};
  filtrTimeTracking: TimeTracking = {};
  dataSource: TimeTracking[] = [];

  constructor(private timeTrackingService: TimeTrackingApiService) { }

  ngOnInit(): void {
    this.timeTrackingService.getTimeTracking().subscribe((timeTracking) => {
      this.dataSource = timeTracking;
    });
  }

  // getTimeTracking(){
  //   this.timeTrackingService.getTimeTracking().subscribe((timeTracking) => {
  //     this.dataSource = timeTracking;
  //   })
  // }

addTimeTracking(){
  this.timeTrackingService.addTimeTracking(this.newTimeTracking).subscribe((timeTracking) => {
    this.dataSource.push(timeTracking);
    this.newTimeTracking = {};
  });

}

updateTimeTracking(timeTracking: TimeTracking){
  console.log('update', timeTracking)
  console.log('this.timetracking', this.dataSource)
  this.timeTrackingService.updateTimeTracking(timeTracking).subscribe(() => {
   
    this.dataSource = this.dataSource.map((item) => (item.id == timeTracking.id ? timeTracking: item))
    this.updTimeTracking = {};
  });
}

deleteTimeTracking(timeTracking: TimeTracking){
  console.log('del', timeTracking)
  this.timeTrackingService.deleteTimeTracking(timeTracking).subscribe(() => {
    this.dataSource = this.dataSource.filter((item) => item.id != timeTracking.id )
    this.delTimeTracking = {}
  });
}

filterTimeTracking(filtrtimeTracking: TimeTracking){
  this.timeTrackingService.filterTimeTracking(filtrtimeTracking).subscribe((timeTracking) => {
    this.dataSource = timeTracking;
  });
}
reset (){
  this.filtrTimeTracking = {};
  this.timeTrackingService.getTimeTracking().subscribe((timeTracking) => {
    this.dataSource = timeTracking;
  });
}
}
