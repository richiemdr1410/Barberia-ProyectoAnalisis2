import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientDataSource } from 'src/app/datasources/client.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from 'src/app/models/client.model';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { AddClientComponent } from './add-client/add-client.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  public user: any;
  public role: any;

  clientData: ClientDataSource | null;
  displayedColumns: Array<string> = ['user_id', 'name', 'last_name', 'second_last_name', 'email', 'telephone_number', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private service: UserService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.clientData = new ClientDataSource(this.service, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.clientData.get(params);
  }

  add(client: User): void {
    const dialogRef = this.dialog.open(AddClientComponent, {
      width: '250px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.clientData.get(params);
    });
  }

  edit(client: User): void {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '250px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.clientData.get(params);
    });
  }

  public delete(client: User) {
    const dialogRef = this.dialog.open(DeleteClientComponent, {
      width: '250px',
      data: client
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.clientData.get(params);
    });
  }

}
