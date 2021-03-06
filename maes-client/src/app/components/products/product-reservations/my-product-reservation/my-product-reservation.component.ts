import { Component, OnInit, ViewChild } from '@angular/core';
import { ReservationDataSource } from 'src/app/datasources/reservation.datasource';
import { MatDialog, MatPaginator } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { AlertService } from 'src/app/services/alert.service';
import { CancelReservationComponent } from '../cancel-reservation/cancel-reservation.component';

@Component({
  selector: 'app-my-product-reservation',
  templateUrl: './my-product-reservation.component.html',
  styleUrls: ['./my-product-reservation.component.scss']
})
export class MyProductReservationComponent implements OnInit {

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
    const dialogRef = this.dialog.open(CancelReservationComponent, {
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
