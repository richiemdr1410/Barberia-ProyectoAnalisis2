import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-add-product-reservation',
  templateUrl: './add-product-reservation.component.html',
  styleUrls: ['./add-product-reservation.component.scss']
})
export class AddProductReservationComponent implements OnInit {

  myForm: FormGroup;

  newReservation = {
    user_id: 0,
    product_id: 0,
    reservation_quantity: 0
  };

  constructor(
    private fb: FormBuilder,
    public service: ReservationService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddProductReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      quantity: new FormControl('', Validators.required),
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  reservar() {
    this.getData();
    const quantity = this.myForm.controls.quantity.value;
    if (quantity > this.data.quantity && quantity !== '') {
      this.myForm.controls.quantity.setErrors({'invalid': true});
    } else {
      this.myForm.controls.quantity.setErrors({'invalid': false});
      this.service.create(this.newReservation)
      .then(
        success => {
          this.alertService.success('Reserva realizada');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al reservara el producto', 5, error.ExceptionMessage);
        }
      );
    }
  }

  getData(): any {
    this.newReservation.user_id = this.data.user.id;
    this.newReservation.product_id = this.data.product.id;
    this.newReservation.reservation_quantity = this.myForm.controls.quantity.value;
  }

}
