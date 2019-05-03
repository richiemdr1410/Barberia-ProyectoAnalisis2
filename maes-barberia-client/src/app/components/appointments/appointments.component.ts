import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import * as moment from 'moment';
import { BarberService } from 'src/app/services/barber.service';
import { ServiceAdministrationService } from 'src/app/services/service-administracion.service';

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

  message: true;
  price: any;
  serviceData: any;
  barbers: any;
  schedule: any;
  display_normal_schedule: boolean;
  display_barber_schedule: boolean;
  display_schedule: boolean;
  display_barbers: boolean;
  enableServices: boolean;

  types = [
    {value: 1, display: 'Horario de atención'},
    {value: 2, display: 'Barbero'}
  ];

  constructor(
    private services: ServiceAdministrationService,
    private barberService: BarberService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.getBarbers();
  }

  private getSchedule(input: any) {
    const date = moment(input).format('YYYY-MM-DD');
    const params = {
      date_of_the_week: date
    };
    this.scheduleService.getByDate(params).subscribe((result) => {
      this.schedule = result.data.data;
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

  category(event) {
    if (event.value === 1) {
      this.serviceData = null;
      this.schedule = null;
      this.display_schedule = true;
      this.display_barbers = false;
    } else if (event.value === 2) {
      this.serviceData = null;
      this.schedule = null;
      this.display_barbers = true;
      this.display_schedule = false;
    } else {
      this.serviceData = null;
      this.schedule = null;
      this.display_barbers = false;
      this.display_schedule = false;
    }
  }


  getDate(event) {
    if (event.value) {
      this.request.date = moment(event.value).format('YYYY-MM-DD');
      this.getSchedule(this.request.date);
    }
  }

  getBarber(event) {
    if (event.value) {
      this.display_schedule = true;
      this.request.barber_id = event.value;
    }
  }

  setSchedule(event) {
    if (event) {
      this.enableServices = true;
      this.request.time = event.hour;
      this.getServices();
    }
  }

  getServices() {
    const params = {
      orderBy: 'service_name',
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

  getService(event) {
    if (event.value) {
      this.request.id_service = event.value;
      this.message = true;
      this.price = this.serviceData.filter(x => x.id === event.value)[0].price;
    }
  }

  login() {
    this.setStorage();
  }

  register() {
    this.setStorage();
  }

  setStorage() {
    localStorage.setItem('appointment', 'true');
    localStorage.setItem('category_id', this.request.category_id.toString());
    localStorage.setItem('id_user', this.request.id_user.toString());
    localStorage.setItem('barber_id', this.request.barber_id.toString());
    localStorage.setItem('id_service', this.request.id_service.toString());
    localStorage.setItem('time', this.request.time.toString());
    localStorage.setItem('date', this.request.date.toString());
  }

}
