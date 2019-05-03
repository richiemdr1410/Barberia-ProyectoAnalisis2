import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAdministrationService } from 'src/app/services/service-administracion.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public services: any;

  constructor(
    private router: Router,
    public service: ServiceAdministrationService
  ) { }

  ngOnInit() {
    this.getServices();
  }

  getServices(): any {
    const params = {
      orderBy: 'service_name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '100'
    };
    this.service.get(params).subscribe(
      (products) => {
        this.services = products.data;
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }

}
