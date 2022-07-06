import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeTrackingApiService } from 'src/app/services/time-tracking-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
 // route: any;

  constructor(private formBuilder: FormBuilder, private timeTrackingService: TimeTrackingApiService, private _snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setForm();
  }
 
 
 //------------------------------------------------------
  timeTrackingForm = this.formBuilder.group({
    id: [],
    name: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', [Validators.required]],
    description: ['',[Validators.required]],
    hours: ['', [Validators.required]],
  });

  get id() {return this.timeTrackingForm.get('id');}
  get name() {return this.timeTrackingForm.get('name');}
  get date() {return this.timeTrackingForm.get('date');}
  get description(){ return this.timeTrackingForm.get('description');}
  get hours() {return this.timeTrackingForm.get('hours'); }

  onSubmit() {
    this.timeTrackingService.updateTimeTracking(this.timeTrackingForm.value).subscribe((timeTracking) => {
      this._snackBar.open("Updated successfully!", "Ok", {
        verticalPosition: 'top',
        duration: 6 * 1000,
      });

    });
  }
  
  setForm() {

    this.route.paramMap

        .pipe(

            switchMap((params: ParamMap) =>

                this.timeTrackingService.findActivityItem(Number(params.get('id')!)),
            ),
        )
        .subscribe((timeTracking) => {

            this.timeTrackingForm.patchValue({

                id: timeTracking.id,

                name: timeTracking.name,

                description: timeTracking.description,

                date: timeTracking.date,

                hours: timeTracking.hours,

            });
          })       
      }

}
