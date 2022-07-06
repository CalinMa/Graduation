import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LocalStorage, StorageMap } from '@ngx-pwa/local-storage';
import { TimeTracking } from 'src/app/models/timeTracking';
import { SubItem } from 'src/app/models/subItem';
import { DialogServiceService } from 'src/app/services/dialog-service.service';
import { TimeTrackingApiService } from 'src/app/services/time-tracking-api.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  dataSubItem: SubItem[] = [];
  displayedColumns: string[] = ['description', 'hours', 'level'];

  dataSource:MatTableDataSource<TimeTracking> = new MatTableDataSource<TimeTracking>();

  isEditing = false;
  openAddSubItem = false;
  parentId: any;
  details: any;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private dialogService: DialogServiceService, @Inject(MAT_DIALOG_DATA) public data: any,
  private timeTrackingService: TimeTrackingApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem("details")){
    this.details = localStorage.getItem("details")
    }
    this.dataSource.data = this.data;
  }

  addSubActivityForm = this.formBuilder.group({
    description: ['', [Validators.required, Validators.minLength(3)]],
    hours: ['', [Validators.required]],
    level: ['',[Validators.required]],
    parentId: [localStorage.getItem("timeTrackingId")]
  });

  get description() {return this.addSubActivityForm.get('description');}
  get hours() {return this.addSubActivityForm.get('hours');}
  get level(){ return this.addSubActivityForm.get('level');}
  
  onSubmit (){
  
    this.timeTrackingService.addTimeTrackingSubItem(this.addSubActivityForm.value).subscribe((timeTracking) => {
      this._snackBar.open("Added successfully!", "Ok", {
        verticalPosition: 'top',
        duration: 6 * 1000,
      });
     
      this.addSubActivityForm.reset();
      this.openAddSubItem = false;
      this.closeDialog()
    });
  }

  showAddNewSubactivity(){
    this.openAddSubItem = true;
  }
  closeDialog() {
    this.dialogService.closeDialog();
  }
}


