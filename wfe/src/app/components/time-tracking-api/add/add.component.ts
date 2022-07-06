import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeTrackingApiService } from 'src/app/services/time-tracking-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private timeTrackingService: TimeTrackingApiService, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  timeTrackingForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', [Validators.required]],
    description: ['',[Validators.required]],
    hours: ['', [Validators.required]],
  });

  get name() {return this.timeTrackingForm.get('name');}
  get date() {return this.timeTrackingForm.get('date');}
  get description(){ return this.timeTrackingForm.get('description');}
  get hours() {return this.timeTrackingForm.get('hours'); }

  onSubmit() {
    this.timeTrackingService.addTimeTracking(this.timeTrackingForm.value).subscribe((timeTracking) => {
      this._snackBar.open("Added successfully!", "Ok", {
        verticalPosition: 'top',
        duration: 6 * 1000,
      });

      this.timeTrackingForm.reset();
    });
  }

}
