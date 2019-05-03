import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductPagination } from '../pagination/product.pagination.model';
import { throwError as observableThrowError } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })

export class UserService {

  public path = 'http://127.0.0.1:8000/api/users';

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

  getAdmins(data: any): Observable<any> {
    const path = 'http://127.0.0.1:8000/api/admins';
    const params = new HttpParams({fromObject: data});
    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as any),
        catchError(error => observableThrowError(error))
      );
  }

  getBarbers(data: any): Observable<any> {
    const path = 'http://127.0.0.1:8000/api/barbers';
    const params = new HttpParams({fromObject: data});
    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as any),
        catchError(error => observableThrowError(error))
      );
  }

  getClients(data: any): Observable<any> {
    const path = 'http://127.0.0.1:8000/api/clients';
    const params = new HttpParams({fromObject: data});
    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as any),
        catchError(error => observableThrowError(error))
      );
  }

  create(data: any): Promise<User> {
    return this.http.post(this.path, data)
      .toPromise()
      .then(response => {
        return response as Product;
      })
      .catch(this.handleError);
  }

  update(data: User): Promise<User> {
    const path = `${this.path}/${data.id}`;

    return this.http.put(path, data)
      .toPromise()
      .then(response => {
        return response as User;
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
