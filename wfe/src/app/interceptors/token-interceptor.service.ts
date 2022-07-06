
import { Injectable } from '@angular/core'; 
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import { API_URL } from '../constants/constants'; 
import {LoginService} from "../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements  HttpInterceptor{

  constructor(private  authService: LoginService,  private _snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const isApiRequest = request.url.startsWith(API_URL);
    if(token && isApiRequest) {
      request = request.clone({
        setHeaders: {
          Authorization:'Bearer '+token
        }
      });

    }

    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) =>{
        if (error.status === 401){
          localStorage.removeItem('token');
          this._snackBar.open("You are not allowed to access this page! Only admin/superadmin is allowed", "Ok", {
            verticalPosition: 'top',
            duration: 15 * 1000,});
          this.authService.redirectToLogin();
        }
         return throwError(error);
      })
    );
  }
}
