import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProductPagination } from '../pagination/product.pagination.model';
import { throwError as observableThrowError } from 'rxjs';
import { ClientPagination } from '../pagination/client.pagination.model';
import { Client } from '../models/client.model';

@Injectable({ providedIn: 'root' })

export class ClientService {

    public path = 'http://127.0.0.1:8000/api/users';

  constructor(
    protected http: HttpClient
  ) { }

  get(data: any): Observable<ClientPagination> {
    const path = 'http://127.0.0.1:8000/api/clients';
    const params = new HttpParams({fromObject: data});
    return this.http.get(path, {params})
      .pipe(
        map((response: any) => response as ClientPagination),
        catchError(error => observableThrowError(error))
      );
  }

  create(data: any): Promise<Client> {
    return this.http.post(this.path, data)
      .toPromise()
      .then(response => {
        return response as Client;
      })
      .catch(this.handleError);
  }

  update(service: Client): Promise<Client> {
    const path = `${this.path}/${service.id}`;

    return this.http.put(path, service)
      .toPromise()
      .then(response => {
        return response as Client;
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
