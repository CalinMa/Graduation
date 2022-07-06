
import { ReactiveFormsModule } from '@angular/forms';
import { TimeTrackingApiComponent } from './components/time-tracking-api/time-tracking-api.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token-interceptor.service'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AddComponent } from './components/time-tracking-api/add/add.component';
import { EditComponent } from './components/time-tracking-api/edit/edit.component'; 

import { DialogComponent } from './components/dialog/dialog.component';
import { LoginComponent } from './components/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component'; 
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import {MatListModule} from "@angular/material/list";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    AppComponent,
   
    TimeTrackingApiComponent,
    AddComponent,
    EditComponent,
   
    DialogComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MDBBootstrapModule
  ],
  providers: [  { provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},

    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }
