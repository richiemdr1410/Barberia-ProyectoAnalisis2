import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-delete-storage',
  templateUrl: './delete-storage.component.html',
  styleUrls: ['./delete-storage.component.scss']
})
export class DeleteStorageComponent implements OnInit {

  constructor(
    public productService: ProductService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteStorageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.productService.delete(this.data.id)
      .subscribe(
        success => {
          this.alertService.success('Producto eliminado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al eliminar el producto', 5, error.ExceptionMessage);
        });
  }

}
