import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { BarberService } from 'src/app/services/barber.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  normal: boolean;
  barber: boolean;
  normalDate: boolean;
  check: '';
  available: boolean;
  service: boolean;
  serviceData: any;
  message: boolean;
  precio: '';
  types = [
    {value: 1, display: 'Horario de atención'},
    {value: 2, display: 'Barbero'}
  ];

  appointment = {
    date: '',
    time: ''
  };

  barbers: any;
  public user: any;
  public role: any;

  time = '';
  date = '';

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private barberService: BarberService,
    private services: ServicesService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getBarbers();
    this.getServices();
  }

  getUser() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });
  }

  getBarbers() {
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.barberService.get(params).subscribe(
      barber => {
        this.barbers = barber.data;
      },
    );
  }

  getServices() {
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.services.get(params).subscribe(
      service => {
        this.serviceData = service.data;
      },
    );
  }

  category(event) {
    if (event.value === 1) {
      this.normal = true;
      this.barber = false;
    } else if (event.value === 2) {
      this.barber = true;
      this.normal = false;
    }
  }

  getService(event) {
    if (event.value) {
      this.message = true;
      console.log(event.value);
      this.precio = this.serviceData.filter(x => x.id === event.value)[0].price;
      console.log(this.precio);
    }
  }

  getDate(event) {
    if (event.value) {
      this.appointment.date = moment(event.value).format('YYYY-MM-DD');
      this.normalDate = true;
    }
    if (this.check !== '' && this.available) {
      this.appointment.date = moment(event.value).format('YYYY-MM-DD');
      this.checkAvailable();
    }
  }

  getTime() {
    if (this.time !== '') {
      this.appointment.time = this.time;
      this.checkAvailable();
    }
  }

  checkAvailable(): any {
    this.available = true;
    this.appointmentService.checkAppointment(this.appointment)
    .pipe(
      ).subscribe((response: any) => {
        this.check = response.data;
        if (response.data) {
          this.service = true;
        } else {
          this.service = false;
        }
      });
  }

}
