import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { BarberPagination } from '../pagination/barber.pagination.model';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';
import { ClientPagination } from '../pagination/client.pagination.model';

export class ClientDataSource implements DataSource<Client> {

  private dataSubject = new BehaviorSubject<Client[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private clientService: ClientService,
    public paginator: MatPaginator
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<Client[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  get(params: any) {
    this.loadingSubject.next(true);
    this.clientService.get(params).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: ClientPagination) => {
          console.log(response);
        this.dataSubject.next(response.data as Client[]);
      });
  }
}
