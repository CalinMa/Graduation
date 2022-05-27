import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeTrackingApiComponent } from './components/time-tracking-api/time-tracking-api.component';
import { TimeComponent } from './components/time/time.component';

const routes: Routes = [
  {
    path: 'time',
    component: TimeComponent
  },
  {
    path: 'time-tracking',
    component: TimeTrackingApiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
