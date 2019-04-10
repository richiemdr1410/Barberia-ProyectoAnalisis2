import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientDataSource } from 'src/app/datasources/client.datasource';
import { MatPaginator } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public user: any;
  public role: any;

  clientData: ClientDataSource | null;
  displayedColumns: Array<string> = ['name', 'last_name', 'second_last_name', 'email', 'telephone_number', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private auth: AuthService,
    private productService: ClientService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.clientData = new ClientDataSource(this.productService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.clientData.get(params);
  }

  public edit(client: Client) {
    console.log(client);
  }

  public delete(client: Client) {
    console.log(client);
  }

}
