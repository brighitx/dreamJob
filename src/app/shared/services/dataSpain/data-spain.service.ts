import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataSpainService {
  url = 'https://raw.githubusercontent.com/IagoLast/pselect/master/data';
  constructor(private http: HttpClient) { }

  getMunicipalities(): Observable<any> {
    return this.http.get(this.url + '/municipios.json')
      .pipe(map((res: any) => res))
      .pipe(catchError(error => this.errorsHandler(error)));
  }

  getProvinces(): Observable<any> {
    return this.http.get(this.url + '/provincias.json')
      .pipe(map((res: any) => res))
      .pipe(catchError(error => this.errorsHandler(error)));
  }

  errorsHandler = (error: HttpErrorResponse) => {
    return throwError(error.message || 'server not working');
  }
}
