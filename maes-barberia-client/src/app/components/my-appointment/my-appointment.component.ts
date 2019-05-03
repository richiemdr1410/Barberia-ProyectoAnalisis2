import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentDataSource } from 'src/app/datasources/appointment.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { DeleteAppointmentComponent } from './delete-appointment/delete-appointment.component';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.component.html',
  styleUrls: ['./my-appointment.component.scss']
})
export class MyAppointmentComponent implements OnInit {

  public user: any;
  public role: any;

  appointmentData: AppointmentDataSource | null;
  displayedColumns: Array<string> = ['service_name', 'service_time', 'price', 'name', 'date', 'time', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private service: AppointmentService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
      this.appointmentData = new AppointmentDataSource(this.service, this.paginator);
      const params = {
        id_user: response.user.id,
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.appointmentData.getClient(params);
    }, (err) => {
      console.error(err);
    });
  }

  public delete(appointment: Appointment) {
    const dialogRef = this.dialog.open(DeleteAppointmentComponent, {
      width: '250px',
      data: appointment
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        id_user: this.user.id,
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.appointmentData.getClient(params);
    });
  }

}
