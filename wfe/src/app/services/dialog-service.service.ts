import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../components/dialog/dialog.component';
import { SubItem } from '../models/subItem';
import { TimeTracking } from '../models/timeTracking';
import { StorageService } from './storage.service';
import { TimeTrackingApiService } from './time-tracking-api.service';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {
 
  dataSubItem: SubItem[] = [];
  

  dataSorce:MatTableDataSource<TimeTracking> = new MatTableDataSource<TimeTracking>();
  
  constructor(public dialog: MatDialog, public storageService: StorageService, public timeTrackingService: TimeTrackingApiService) { }


  


  openDialog(timeTracking: TimeTracking) {
      this.getTimeTrackingSubitem(timeTracking);
   }

  getTimeTrackingSubitem(timeTracking: TimeTracking){

    this.timeTrackingService.getTimeTrackingSubItem(timeTracking).subscribe((subItem) => {
      this.dataSubItem = subItem
      
      if(timeTracking.id != null) {
        var x = timeTracking.id.toString();
        localStorage.setItem("timeTrackingId", x)
      } 
      this.openDialogMessage()
    })
  }

  openDialogMessage(){
    
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: this.dataSubItem
    });
   
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
