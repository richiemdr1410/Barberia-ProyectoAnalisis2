import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export class AdministratorDataSource implements DataSource<User> {

  private dataSubject = new BehaviorSubject<[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(
    private service: UserService,
    public paginator: MatPaginator
  ) { }

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  get(params: any) {
    this.loadingSubject.next(true);
    this.service.getAdmins(params).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: any) => {
        this.dataSubject.next(response.data as any);
      });
  }
}
