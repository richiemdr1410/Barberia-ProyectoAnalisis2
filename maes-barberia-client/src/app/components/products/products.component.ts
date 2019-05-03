import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any;

  constructor(
    private router: Router,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): any {
    const params = {
      orderBy: 'name',
      sortedBy: 'asc',
      searchJoin: 'and',
      page: '1',
      page_size: '100'
    };
    this.productService.get(params).subscribe(
      (products) => {
        this.products = products.data;
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }

}
