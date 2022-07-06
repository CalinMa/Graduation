import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/time-tracking-api/add/add.component';
import { EditComponent } from './components/time-tracking-api/edit/edit.component';
import { TimeTrackingApiComponent } from './components/time-tracking-api/time-tracking-api.component';

import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'users', component:UsersComponent},
  {path: 'time-tracking',component: TimeTrackingApiComponent},
  {path: 'time-tracking/add',component: AddComponent},
  {path: 'time-tracking/edit/:id',component: EditComponent},
  {path: 'pie', component: PieChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class AppRoutingModule { }
