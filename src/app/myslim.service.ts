import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/User';
import { ContentService } from "./content.service";

@Injectable({
  providedIn: 'root'
})
export class MyslimService {
  private usersUrl: string;
  private userIdUrl;
  private userForgotUrl: string;
  private userResetUrl: string;
  private tokenUrl: string;
  private trialsUrl: string;

  constructor(private http: HttpClient,
    private contentService: ContentService
  ) {
    //nvm use v10.23.0
    const API = contentService.API;
    this.usersUrl = API + 'users/';
    this.tokenUrl = API + 'users/token/';
    this.trialsUrl = API + 'trials/';
    this.userIdUrl = (userId) => (API + 'users/' + userId);
    this.userForgotUrl = this.usersUrl + 'forgot';
    this.userResetUrl = this.usersUrl + 'reset';


  }

  public getToken = (email: string, password: string): Observable<any> => {
    return this.http.post(
      this.tokenUrl,
      {
        email: email.toLowerCase(),
        password: password
      }
    ).pipe(
      map((response: any) => <any>response),
      catchError(this.handleError)
    )
  }

  public getUsers = (): Observable<User> => {
      return this.http.get(this.usersUrl).pipe(
        map((response: any) => <User>response.data),
        catchError(this.handleError)
      )
  }

  public createUser = (name: string, email: string, password: string): Observable<User> => {
      return this.http.post(
        this.usersUrl,
        {
          name: name,
          email: email.toLowerCase(),
          password: password
        }
      ).pipe(
        map((response: any) => <User>response.data),
        catchError(this.handleError)
      )
  }

  public updateUser = (id: string, password: string, newPassword: string): Observable<any> => {
      return this.http.put(
        this.userIdUrl(id),
        {
          password: password,
          newPassword: newPassword,
        }
      ).pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  public forgot = (email: string, lng: string): Observable<any> => {
    return this.http.post(
      this.userForgotUrl,
      {
        email: email,
        lng: lng,
      }
    ).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  public reset = (token: string, password: string): Observable<any> => {
    return this.http.put(
      this.userResetUrl,
      {
        token: token,
        password: password,
      }
    ).pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  };

  // private handleError(error: any) {
  //   console.error(error);
  //   return throwError(error.error || 'Server error');
  // }
}
