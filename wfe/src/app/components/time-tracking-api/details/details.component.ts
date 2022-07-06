import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TimeTracking } from 'src/app/models/timeTracking';
import { TimeTrackingApiService } from 'src/app/services/time-tracking-api.service';
import { __assign } from 'tslib';
import { TimeTrackingApiComponent } from '../time-tracking-api.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  

  constructor(private formBuilder: FormBuilder, private timeTrackingService: TimeTrackingApiService, private _snackBar: MatSnackBar,
     private route: ActivatedRoute, private storage: StorageMap) { }
  
  ngOnInit(): void {
    this.getSubitemFromStorage()
  }


  timeTrackingForm = this.formBuilder.group({
    id: [''],
    description: ['',[Validators.required]],
    hours: ['', [Validators.required]],
    level: ['', [Validators.required]]
  });

  getSubitemFromStorage () {
  
   this.storage.get('timetracking').subscribe((...timeTracking) => {
    
 const target = __assign(timeTracking)
    this.timeTrackingForm.patchValue({
      id: target[0].id,
      description: target[0].timeTrackingSubItems[0].description,
      hours: target[0].timeTrackingSubItems[0].hours,
      level: target[0].timeTrackingSubItems[0].level

    })
  });
  }

  get id() {return this.timeTrackingForm.get('id');}
  get description(){ return this.timeTrackingForm.get('description');}
  get hours() {return this.timeTrackingForm.get('hours'); }
  get level() {return this.timeTrackingForm.get('level'); }
 
  onSubmit() {
    console.log(this.timeTrackingForm.value)
    this.timeTrackingService.updateTimeTracking(this.timeTrackingForm.value).subscribe((timeTracking) => {
      this._snackBar.open("Updated successfully!", "Ok", {
        verticalPosition: 'top',
        duration: 6 * 1000,
      });

     // this.timeTrackingForm.reset();
    });
  }


}


