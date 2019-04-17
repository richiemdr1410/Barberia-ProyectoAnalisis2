import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';
import { Service } from 'src/app/models/service.model';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  myForm: FormGroup;

  newService = {
    name: '',
    service_time: '',
    price: 0
  };

  constructor(
    private fb: FormBuilder,
    public service: ServicesService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddServiceComponent>,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl(''),
      service_time: new FormControl(''),
      price: new FormControl('')
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.getData();
    this.service.create(this.newService)
      .then(
        success => {
          this.alertService.success('Servicio actualizado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al actualizar el servicio', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newService.name = this.myForm.controls.name.value;
    this.newService.price = this.myForm.controls.price.value;
    this.newService.service_time = this.myForm.controls.service_time.value;
  }

}
