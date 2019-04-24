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

  request = {
    category_id: 0,
    id_user: 0,
    barber_id: 0,
    id_service: 0,
    time: '',
    date: ''
  };

  category_type: number;
  normal: boolean;
  barber: boolean;
  normalDate: boolean;
  check: '';
  available: boolean;
  service: boolean;
  serviceData: any;
  message: boolean;
  barber_id: number;
  barber_active: boolean;
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
    this.category_type = event.value;
    if (event.value === 1) {
      this.normal = false;
      this.normal = true;
      this.barber = false;
      this.message = false;
      this.normalDate = false;
      this.service = false;
    } else if (event.value === 2) {
      this.barber = true;
      this.normal = false;
      this.message = false;
      this.normalDate = false;
      this.service = false;
    }
  }

  getBarber(event) {
    if (event.value) {
      this.barber_id = event.value;
      this.barber_active = true;
      this.normal = true;
    }
  }

  getService(event) {
    if (event.value) {
      this.request.id_service = event.value;
      this.message = true;
      this.precio = this.serviceData.filter(x => x.id === event.value)[0].price;
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

  reservar() {
    this.getParams();
    this.appointmentService.create(this.request).then(
      (result) => {
        this.normal = false;
        this.barber = false;
        this.message = false;
        this.normalDate = false;
        this.service = false;
      }
    );
  }

  getParams() {
    this.request.category_id = this.category_type;
    this.request.id_user = this.user.id;
    this.request.barber_id = this.barber_id;
    this.request.time = this.appointment.time;
    this.request.date = this.appointment.date;
  }

}
