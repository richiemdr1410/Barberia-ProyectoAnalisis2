import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/services/alert.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-storage',
  templateUrl: './edit-storage.component.html',
  styleUrls: ['./edit-storage.component.scss']
})
export class EditStorageComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    public productService: ProductService,
    public dialogRef: MatDialogRef<EditStorageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      quantity: new FormControl('', Validators.required)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.data.quantity = this.myForm.controls.quantity.value;
    this.productService.updateStorage(this.data).then(
      (response) => {
        this.alertService.success('Se actualizo el inventario');
        this.dialogRef.close(response);
    });
  }

}
