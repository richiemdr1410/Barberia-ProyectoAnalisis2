import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductPagination } from '../pagination/product.pagination.model';
import { throwError as observableThrowError } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({ providedIn: 'root' })

export class ServicesService {

    public path = 'http://127.0.0.1:8000/api/service';

  constructor(
    protected http: HttpClient
  ) { }

  get(data: any): Observable<ProductPagination> {
    const params = new HttpParams({fromObject: data});
    return this.http.get(this.path, {params})
      .pipe(
        map((response: any) => response as ProductPagination),
        catchError(error => observableThrowError(error))
      );
  }

  create(data: any): Promise<Service> {
    return this.http.post(this.path, data)
      .toPromise()
      .then(response => {
        return response as Service;
      })
      .catch(this.handleError);
  }

  update(service: Service): Promise<Service> {
    const path = `${this.path}/${service.id}`;

    return this.http.put(path, service)
      .toPromise()
      .then(response => {
        return response as Service;
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
