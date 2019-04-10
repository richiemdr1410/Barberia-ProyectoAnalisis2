import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceDataSource } from 'src/app/datasources/service.datasource';
import { MatPaginator } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public user: any;
  public role: any;

  servicetData: ServiceDataSource | null;
  displayedColumns: Array<string> = ['name', 'service_time', 'price', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private auth: AuthService,
    private servicesService: ServicesService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.servicetData = new ServiceDataSource(this.servicesService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.servicetData.get(params);
  }

  public edit(service: Service) {
    console.log(service);
  }

  public delete(service: Service) {
    console.log(service);
  }

}
