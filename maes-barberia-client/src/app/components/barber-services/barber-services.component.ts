import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentDataSource } from 'src/app/datasources/appointment.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-barber-services',
  templateUrl: './barber-services.component.html',
  styleUrls: ['./barber-services.component.scss']
})
export class BarberServicesComponent implements OnInit {

  public user: any;
  public role: any;

  appointmentData: AppointmentDataSource | null;
  displayedColumns: Array<string> = ['service_name', 'price'];

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

}
