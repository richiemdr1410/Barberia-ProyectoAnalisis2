import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDataSource } from 'src/app/datasources/product.datasource';
import { MatPaginator, MatDialog } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-product-administration',
  templateUrl: './product-administration.component.html',
  styleUrls: ['./product-administration.component.scss']
})
export class ProductAdministrationComponent implements OnInit {

  public user: any;
  public role: any;

  productData: ProductDataSource | null;
  displayedColumns: Array<string> = ['name', 'description', 'price', 'comments', 'status', 'quantity', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.auth.profile().then((response) => {
      this.user = response.user;
      this.role = response.role;
    }, (err) => {
      console.error(err);
    });

    this.productData = new ProductDataSource(this.productService, this.paginator);
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '10'
    };
    this.productData.get(params);
  }

  add(product: Product): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
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
      this.productData.get(params);
    });
  }

  edit(product: Product): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
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
      this.productData.get(params);
    });
  }

  public delete(product: Product) {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
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
      this.productData.get(params);
    });
  }

}
