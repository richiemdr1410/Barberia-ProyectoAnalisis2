import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentDataSource } from 'src/app/datasources/appointment.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { DeleteAppointmentComponent } from '../my-appointment/delete-appointment/delete-appointment.component';
import { BarberConfirmAppointmentComponent } from './barber-confirm-appointment/barber-confirm-appointment.component';

@Component({
  selector: 'app-barber-appointments',
  templateUrl: './barber-appointments.component.html',
  styleUrls: ['./barber-appointments.component.scss']
})
export class BarberAppointmentsComponent implements OnInit {

  public user: any;
  public role: any;

  appointmentData: AppointmentDataSource | null;
  displayedColumns: Array<string> = ['service_name', 'service_time', 'price', 'name', 'date', 'time', 'status', 'actions'];

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
        barber_id: response.user.id,
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.appointmentData.getBarber(params);
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
        barber_id: this.user.id,
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.appointmentData.getBarber(params);
    });
  }

  public confirm(appointment: Appointment) {
    const dialogRef = this.dialog.open(BarberConfirmAppointmentComponent, {
      width: '250px',
      data: appointment
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        barber_id: this.user.id,
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.appointmentData.getBarber(params);
    });

  }
}
