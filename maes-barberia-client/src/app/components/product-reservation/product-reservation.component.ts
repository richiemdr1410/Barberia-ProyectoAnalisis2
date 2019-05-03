import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, MatDialog } from '@angular/material';
import { AlertService } from 'src/app/services/alert.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationDataSource } from './../../datasources/reservation.datasource';
import { DeleteProductReservationComponent } from './delete-product-reservation/delete-product-reservation.component';

@Component({
  selector: 'app-product-reservation',
  templateUrl: './product-reservation.component.html',
  styleUrls: ['./product-reservation.component.scss']
})
export class ProductReservationComponent implements OnInit {

  public user: any;
  public role: any;

  reservationData: ReservationDataSource | null;
  displayedColumns: Array<string> = ['name', 'reservation_quantity', 'price', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private alertService: AlertService,
    private reservataionService: ReservationService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
      this.getReservation(response.user);
    }, (err) => {
      console.error(err);
    });
  }


  private getReservation(user) {
    this.reservationData = new ReservationDataSource(this.reservataionService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10',
      user_id: user.id
    };
    this.reservationData.get(params);
  }

  public delete(reservation: any) {
    const dialogRef = this.dialog.open(DeleteProductReservationComponent, {
      width: '250px',
      data: reservation
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10',
        user_id: this.user.id
      };
      this.reservationData.get(params);
    });
  }

}
