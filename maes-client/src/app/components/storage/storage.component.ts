import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageDataSource } from 'src/app/datasources/storage.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { Product } from 'src/app/models/product.model';
import { EditStorageComponent } from './edit-storage/edit-storage.component';
import { DeleteStorageComponent } from './delete-storage/delete-storage.component';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  public user: any;
  public role: any;

  dsData: any;
  dataSource: StorageDataSource | null;
  displayedColumns: Array<string> = ['name', 'description', 'price', 'comments', 'status', 'quantity', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getUser();

    this.dataSource = new StorageDataSource(this.productService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.dataSource.get(params);
  }

  getUser(): any {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });
  }

  edit(product: Product): void {
    const dialogRef = this.dialog.open(EditStorageComponent, {
      width: '250px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.dataSource.get(params);
    });
  }


  public delete(product: Product) {
    const dialogRef = this.dialog.open(DeleteStorageComponent, {
      width: '250px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      const params = {
        orderBy: 'name',
        sortedBy: 'asc',
        searchJoin: 'and',
        page: '1',
        page_size: '10'
      };
      this.dataSource.get(params);
    });
  }
}
