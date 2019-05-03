import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';
import { ImageService } from 'src/app/services/image.service';
import { ServiceAdministrationService } from 'src/app/services/service-administracion.service';

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
    price: 0,
    image: ''
  };

  newImage = {
    image: '',
    type: 'services'
  };

  constructor(
    private fb: FormBuilder,
    public service: ServiceAdministrationService,
    public imageService: ImageService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddServiceComponent>,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl('', Validators.required),
      service_time: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
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
          this.imageService.create(this.newImage).then(
            data => {
              this.alertService.success('Servicio agregado con éxito');
              this.dialogRef.close();
            }
          );
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
    this.newService.image = this.myForm.controls.image.value.fileNames;
    this.newImage.image = this.myForm.controls.image.value;
  }

}
