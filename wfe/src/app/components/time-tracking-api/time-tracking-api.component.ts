import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TimeTracking } from 'src/app/models/timeTracking';
import { TimeTrackingApiService } from 'src/app/services/time-tracking-api.service';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { StorageService } from 'src/app/services/storage.service'; 
import {SubItem} from  'src/app/models/subItem';
import { ChartsModule } from 'angular-bootstrap-md';


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
  dataSubItem: SubItem[] = [];
  userId : any;
  details: string = "";
  hoursOrder : string = "none";
  chartSubItem: SubItem[] = [];



  displayedColumns: string[] = ['name', 'description', 'hours', 'date', 'operations'];

  //-----chart pie start
  chartType = 'pie';

  chartDatasets = [
    { data: [0, 0, 0]}
  ];

  chartLabels = ['Low', 'High', 'Medium'];

  chartColors = [
    {
      backgroundColor: ['#2ECC71', '#C0392B', '#E67E22'],
      hoverBackgroundColor: [],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };
  ///----end

  constructor(private timeTrackingService: TimeTrackingApiService, private storage: StorageMap,
    private dialogService: DialogServiceService, private storageService: StorageService) { 
     
    }

  ngOnInit(): void {
    this.timeTrackingService.getTimeTracking().subscribe((timeTracking) => {
      this.dataSource = timeTracking;
    });
   
  }
  chartClicked(event: any): void {
    console.log(event);
  }

  chartHovered(event: any): void {
    console.log(event);
  }

  changeChart(timeTracking: TimeTracking){
    
    this.getTimeTrackingSubitem(timeTracking);
    
  }

  getTimeTrackingSubitem(timeTracking: TimeTracking){

    this.timeTrackingService.getTimeTrackingSubItem(timeTracking).subscribe((subItem) => {
      this.chartSubItem = subItem
     
      const levels = this.chartSubItem.map(level => level.level)
    
      let low = 0;
      let medium = 0;
      let high = 0;
      for (let n = 0; n < levels.length; n++){
        if (levels[n] == "low"){
           low ++ ; 
        } else if (levels[n] == "medium"){
          medium++;
        } else high++
      }
      this.chartDatasets = [{data: [low, high, medium]}]
      
    })
  }
 openDialog(timeTracking: TimeTracking){
     if (timeTracking.name){
         this.details = timeTracking.name
         }
    localStorage.setItem("details", this.details)
  
    this.dialogService.openDialog(timeTracking);
     
  }


addTimeTracking(){
  this.timeTrackingService.addTimeTracking(this.newTimeTracking).subscribe((timeTracking) => {
    this.dataSource = [...this.dataSource, timeTracking];
    this.newTimeTracking = {};
  });

}

updateTimeTracking(timeTracking: TimeTracking){
  this.timeTrackingService.updateTimeTracking(timeTracking).subscribe(() => {
    timeTracking.isEditing = false;
    this.dataSource = this.dataSource.map((item) => (item.id == timeTracking.id ? timeTracking: item))
    this.updTimeTracking = {};
  });
}

deleteTimeTracking(timeTracking: TimeTracking){
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

onOrderHoursSelected(value: string) {
 
  this.hoursOrder = value;
  
  this.sortHours();
  
}

sortHours() {
  
  this.timeTrackingService.getTimeTracking().subscribe((timeTracking) => {
    this.dataSource = timeTracking;
    if(  this.hoursOrder == "asc") {
      this.dataSource.sort((a?, b?) => ((a.hours != undefined && b.hours != undefined) ? (a.hours < b.hours ? -1 : 1) : 0));
    } else if(this.hoursOrder == "desc") {
      this.dataSource.sort((a?, b?) => ((a.hours != undefined && b.hours != undefined) ? (a.hours > b.hours ? -1 : 1) : 0));
    }
  });

}
}
