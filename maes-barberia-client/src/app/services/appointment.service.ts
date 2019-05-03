import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AppointmentService {

    public path = 'http://127.0.0.1:8000/api/appointment';

  constructor(
    protected http: HttpClient
  ) { }

  get(data: any): Observable<any> {
    const params = new HttpParams({fromObject: data});
    return this.http.get(this.path, {params})
      .pipe(
        map((response: any) => response as any),
        catchError(error => observableThrowError(error))
      );
  }

  create(data: any): Promise<any> {
    const path = 'http://127.0.0.1:8000/api/add/appointment';
    return this.http.post(path, data)
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(this.handleError);
  }

  checkAppointment(data: any): Observable<any> {
    const path = 'http://127.0.0.1:8000/api/check/appointment';
    const params = new HttpParams({fromObject: data});

    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as any),
        catchError(error => observableThrowError(error))
      );
  }

  getClient(data: any): Observable<any> {
    const path = 'http://127.0.0.1:8000/api/appointment/client';
    const params = new HttpParams({fromObject: data});
    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as any),
        catchError(error => observableThrowError(error))
      );
  }

  getBarber(data: any): Observable<any> {
    const path = 'http://127.0.0.1:8000/api/appointment/barber';
    const params = new HttpParams({fromObject: data});
    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as any),
        catchError(error => observableThrowError(error))
      );
  }

  update(id: any, data: any): Promise<any> {
    const path = `http://127.0.0.1:8000/api/appointment/${id}`;

    return this.http.put(path, data)
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(this.handleError);
  }

  delete(id: number) {
    const path = `${this.path}/${id}`;
    return this.http.delete(path)
      .pipe(
        map((response: any) => response.data),
        catchError(error => observableThrowError(error))
      );
  }

  extractData(result: any): any {
    return result;
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
