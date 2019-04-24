import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {

  public services: any;

  constructor(
    private router: Router,
    public serviceService: ServicesService
  ) { }

  ngOnInit() {
    this.getServices();
  }

  getServices(): any {
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '100'
    };
    this.serviceService.get(params).subscribe(
      (products) => {
        this.services = products.data;
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }

}
