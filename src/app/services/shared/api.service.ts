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
      const headersConfig = {
        'Content-Type': 'application/json',
        'Token': 'eyJraWQiOiJacjYybGF1WVhhY3JGRzIrUXNtWjQ0XC9Yc3dDSk12Qk5pRTdiU2FGY0xQdz0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiNzE0MDYzMDEtOGUwZS00NmQ2LTgzZWMtNTQ5N2EzNTU0MjcxIiwic3ViIjoiYTgxZTcxNjQtNzNmOC00MTM2LWE2YWUtYjZhYWVkMjcxYTc4IiwiZXZlbnRfaWQiOiI1MTlhM2FiOS1kMzU1LTQwYzQtODI5Zi00ZjFiZTZiOGY2OTkiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjM1MDc0NDQ1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8yU2RhaVE0VEwiLCJleHAiOjE2MzUwNzgwNDUsImlhdCI6MTYzNTA3NDQ0NSwianRpIjoiZjVjMGYzOWEtYjg5Ni00YTk5LThmNDgtNmNiYmZhY2EzMjAwIiwiY2xpZW50X2lkIjoiN3ZnMGxkbGxoNjA1YWMyc3ZlbmM5Zm5tMjciLCJ1c2VybmFtZSI6InBhbmRhdXNlciJ9.uh8jc5TKG7ZmLxl5Pb07xMx2VkUKCbz-F41l0Z-vdmD81pE3_cuwJ31zcG0KoKA_h5KmhS4JUtsRITZG9Et6iRTkyPa7rtamiWX78ehfOQL1irQRUps2Ycok4Ee6CSittNctRyrGdF6ounW-_j6JrYgn4CG7NaoVPogjBkvESI5dakrjgmGuOoIJOxK384WC3fhaRxEoosT2JDldQyJXXFU1mvOXEyReao_ifCSSIkpia8i4-cw0-Fd2irJ8UQ9A9mWXKdGY3SffYbXf-afjPLrs-RhrnU3gRtFbKAjRG3nUNn231LLWQj6cOVae2HCN5EEeG8HZ90sTr3Mzwo4zBQ',
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
  