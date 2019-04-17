import { Component, OnInit } from '@angular/core';
import { BarberService } from 'src/app/services/barber.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  barbers: any;

  constructor(
    private barberService: BarberService
  ) { }

  ngOnInit() {
    this.getBarbers();
  }

  getBarbers() {
    this.barberService.getBarber().subscribe(
      barber => {
        this.barbers = barber;
      },
    );
  }

}
