import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Service } from 'src/app/models/service.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  constructor(
    public service: ProductService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.delete(this.data.id)
      .subscribe(
        success => {
          this.alertService.success('Producto eliminado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al eliminar el Producto', 5, error.ExceptionMessage);
        });
  }

}
