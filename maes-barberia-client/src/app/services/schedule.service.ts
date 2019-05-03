import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ScheduleService {
    public path = 'http://127.0.0.1:8000/api/schedule';

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

    getByDate(data: any): Observable<any> {
        const params = new HttpParams({fromObject: data});
        return this.http.get(this.path, {params})
          .pipe(
            map((response: any) => response as any),
            catchError(error => observableThrowError(error))
        );
    }
}
