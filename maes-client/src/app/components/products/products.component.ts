import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDataSource } from 'src/app/datasources/product.datasource';
import { ProductService } from 'src/app/services/products.service';
import { MatPaginator } from '@angular/material';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public user: any;
  public role: any;

  productData: ProductDataSource | null;
  displayedColumns: Array<string> = ['name', 'description', 'price', 'comments', 'status', 'quantity', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
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

  public edit(product: Product) {
    console.log(product);
  }

  public delete(product: Product) {
    console.log(product);
  }

}
