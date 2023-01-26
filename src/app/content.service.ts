import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Organization } from "src/model/Organization";
import { MediaAsset } from "src/model/MediaAsset";
import { Game } from "src/model/Game";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  // public API = 'http://192.168.0.166:3070/api/';
  public WEB_APP = 'http://127.0.0.1:8080';

  public API = 'http://127.0.0.1:3070/api/';
  // public WEB_APP = 'https://app.touchtheculture.eu/web/';
  // public API = 'https://curator.touchtheculture.eu/api/';

  private mediaUrl = (assetId: string) => this.API + 'assets/' + assetId + '/media';
  private assetUrl = (assetId: string) => this.API + 'assets/' + assetId;
  private gameUrl = (gameId: string) => this.API + 'games/' + gameId;
  private orgUrl = (orgId: string) => this.API + 'orgs/' + orgId;
  private orgJoinUrl = (orgId: string) => this.API + 'orgs/' + orgId + '/join';
  private orgAcceptJoinUrl =
    (orgId: string, userId: string) => this.API + 'orgs/' + orgId + '/accept/' + userId;
  private orgRejectJoinUrl =
    (orgId: string, userId: string) => this.API + 'orgs/' + orgId + '/reject/' + userId;
  private orgCancelMembershipUrl =
    (orgId: string, userId: string) => this.API + 'orgs/' + orgId + '/cancel/' + userId;
  private orgsForUserUrl = (userId: string) => this.API + 'users/' + userId + '/orgs';
  private orgMembersUrl = (orgId: string) => this.API + 'orgs/' + orgId + '/members';
  private mediaAssetsUrl = this.API + 'assets/'
  private gamesUrl = this.API + 'games/'
  private orgsUrl = this.API + 'orgs/'
  private changeOrgTokenUrl = this.API + 'users/changed-org-token'


  constructor(
    private http: HttpClient
  ) {}

  public deleteMedia = (assetId): Observable<any> => {
      return this.http.delete(this.mediaUrl(assetId)).pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  public deleteAsset = (assetId): Observable<any> => {
    //TODO check if media is deleted
      return this.http.delete(this.assetUrl(assetId)).pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  public deleteOrg = (orgId): Observable<any> => {
    //TODO check if media is deleted
      return this.http.delete(this.orgUrl(orgId)).pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  public getOrgsForUser = (userId): Observable<Organization[]> => {
      return this.http.get(this.orgsForUserUrl(userId)).pipe(
        map((response: any) => <Organization[]>response.data),
        catchError(this.handleError)
      )
  }

  public getOrgMembers = (orgId): Observable<any> => {
      return this.http.get(this.orgMembersUrl(orgId)).pipe(
        map((response: any) => <any>response.data),
        catchError(this.handleError)
      )
  }

  public getMediaAssets = (): Observable<MediaAsset[]> => {
      return this.http.get(this.mediaAssetsUrl).pipe(
        map((response: any) => <MediaAsset[]>response.data),
        catchError(this.handleError)
      )
  }

  public getOrgs = (): Observable<Organization[]> => {
      return this.http.get(this.orgsUrl).pipe(
        map((response: any) => <Organization[]>response.data),
        catchError(this.handleError)
      )
  }

  public joinOrg = (orgId): Observable<any> => {
      return this.http.post(this.orgJoinUrl(orgId),{}).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public cancelJoinOrg = (orgId): Observable<any> => {
      return this.http.delete(this.orgJoinUrl(orgId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public acceptJoinOrg = (orgId, userId): Observable<any> => {
      return this.http.put(this.orgAcceptJoinUrl(orgId, userId),{}).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public rejectJoinOrg = (orgId, userId): Observable<any> => {
      return this.http.delete(this.orgRejectJoinUrl(orgId, userId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }


  public cancelMembershipOrg = (orgId, userId): Observable<any> => {
      return this.http.delete(this.orgCancelMembershipUrl(orgId, userId)).pipe(
        map((response: any) => <any>response),
        catchError(this.handleError)
      )
  }

  public getGames = (): Observable<Game[]> => {
      return this.http.get(this.gamesUrl).pipe(
        map((response: any) => <Game[]>response.data),
        catchError(this.handleError)
      )
  }

  public getGame = (gameId): Observable<Game> => {
      return this.http.get(this.gameUrl(gameId)).pipe(
        map((response: any) => <Game>response.data),
        catchError(this.handleError)
      )
  }
  public deleteGame = (gameId): Observable<any> => {
      return this.http.delete(this.gameUrl(gameId)).pipe(
        map((response: any) => response),
        catchError(this.handleError)
      )
  }

  public addGame = (data): Observable<Game> => {
    return this.http.post(
      this.gamesUrl ,
      data
    ).pipe(
      map((response: any) => <Game>response.data),
      catchError(this.handleError)
    )
  }

  public updateGame = (gameId, data): Observable<Game> => {
    return this.http.put(
      this.gameUrl(gameId) ,
      data
    ).pipe(
      map((response: any) => <Game>response.data),
      catchError(this.handleError)
    )
  }

  public addMediaAsset = (data): Observable<MediaAsset> => {
    return this.http.post(
      this.mediaAssetsUrl ,
      data
    ).pipe(
      map((response: any) => <MediaAsset>response.data),
      catchError(this.handleError)
    )
  }

  public addOrg = (data): Observable<Organization> => {
    return this.http.post(
      this.orgsUrl ,
      data
    ).pipe(
      map((response: any) => <Organization>response.data),
      catchError(this.handleError)
    )
  }

  public changeOrgToken = (orgId): Observable<string> => {
    return this.http.post(
      this.changeOrgTokenUrl ,
      {_id: orgId}
    ).pipe(
      map((response: any) => <string>response.token),
      catchError(this.handleError)
    )
  }

  upload(assetId, file):Observable<any> {

      // Create form data
      const formData = new FormData();

      // Store form name as "file" with file data
      formData.append("file", file, file.name);
      // formData.enctype = 'multipart/form-data'

      // Make http post request over api
      // with formData as req
      return this.http.post(this.mediaUrl(assetId), formData)
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
}
