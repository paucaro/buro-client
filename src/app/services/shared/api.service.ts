import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'environments/environment'; 

@Injectable({
    providedIn: 'root'
  })
  @Injectable()
  export class ApiService {

    constructor(
      private http: HttpClient
  
    ) { }
  
    setHeaders(): HttpHeaders {
      const headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      return new HttpHeaders(headersConfig);
    }
  
    setHeadersCustomer() {
      const user = localStorage.getItem("CognitoIdentityServiceProvider.7vg0ldllh605ac2svenc9fnm27.LastAuthUser");
      const token = localStorage.getItem(`CognitoIdentityServiceProvider.7vg0ldllh605ac2svenc9fnm27.${user}.idToken`);
      console.log(token)
      const headersConfig = {
        'Content-Type': 'application/json',
        'Token': token,
      };
      return new HttpHeaders(headersConfig);
    }
  
  
    private formatErrors(error: any) {
      const err_msg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return throwError(error);
    }
  
    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
      return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeadersCustomer(), params: params }).
        pipe(map((response: any) => response),
          catchError(this.formatErrors));
    }
  
    put(path: string, body: Object = {}): Observable<any> {
      return this.http.put(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        { headers: this.setHeaders() }
      ).pipe(map((response: any) => response),
        catchError(error => this.formatErrors(error)));
    }
  
    post(path: string, body: Object = {}): Observable<any> {
      return this.http.post(
        `${environment.api_url}${path}`,
        JSON.stringify(body),
        { headers: this.setHeaders() }
      ).pipe(map((response: any) => response),
        catchError(this.formatErrors));
    }
  
    delete(path): Observable<any> {
      return this.http.delete(
        `${environment.api_url}${path}`,
        { headers: this.setHeaders() }
      ).pipe(map((response: any) => response),
        catchError(this.formatErrors));
    }
  }
  