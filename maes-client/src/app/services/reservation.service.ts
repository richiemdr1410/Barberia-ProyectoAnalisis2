import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ReservationService {

    public path = 'http://127.0.0.1:8000/api/reservations';

  constructor(
    protected http: HttpClient
  ) { }

  get(data: any): Observable<any> {
    const params = new HttpParams({fromObject: data});
    return this.http.get(this.path, {params})
      .pipe(
        map((response: any) => response),
        catchError(error => observableThrowError(error))
      );
  }

  getReservationByUser(data: any): Observable<any> {
    const path = 'http://127.0.0.1:8000/api/reservation/user';
    const params = new HttpParams({fromObject: data});
    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response),
        catchError(error => observableThrowError(error))
      );
  }

  create(data: any): Promise<any> {
    return this.http.post(this.path, data)
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(this.handleError);
  }

  update(data: any): Promise<any> {
    const path = `${this.path}/${data.id}`;

    return this.http.put(path, data)
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(this.handleError);
  }

  delete(reservation_id: number) {
    const path = `${this.path}/${reservation_id}`;
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
