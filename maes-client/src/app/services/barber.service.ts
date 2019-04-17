import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { BarberPagination } from '../pagination/barber.pagination.model';
import { Barber } from '../models/barber.model';

@Injectable({ providedIn: 'root' })

export class BarberService {

    public path = 'http://127.0.0.1:8000/api/barbers';

  constructor(
    protected http: HttpClient
  ) { }

  get(data: any): Observable<BarberPagination> {
    const params = new HttpParams({fromObject: data});
    return this.http.get(this.path, {params})
      .pipe(
        map((response: any) => response as BarberPagination),
        catchError(error => observableThrowError(error))
      );
  }

  create(data: any): Promise<Barber> {
    return this.http.post(this.path, data)
      .toPromise()
      .then(response => {
        return response as Barber;
      })
      .catch(this.handleError);
  }

  getBarber(): Observable<BarberPagination> {
    return this.http.get(this.path)
      .pipe(
        map((response: any) => response as BarberPagination),
        catchError(error => observableThrowError(error))
      );
  }

  update(barber: Barber): Promise<Barber> {
    const path = `${this.path}/${barber.id}`;

    return this.http.put(path, barber)
      .toPromise()
      .then(response => {
        return response as Barber;
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
