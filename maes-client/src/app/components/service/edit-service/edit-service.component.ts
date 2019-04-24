import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Service } from 'src/app/models/service.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { getViewData } from '@angular/core/src/render3/state';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

  myForm: FormGroup;

  newImage = {
    image: '',
    type: 'servicios'
  };

  constructor(
    private fb: FormBuilder,
    public service: ServicesService,
    public imageService: ImageService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<EditServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl(this.data.name),
      service_time: new FormControl(this.data.service_time),
      price: new FormControl(this.data.price),
      image: new FormControl('', Validators.required)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.getData();
    this.service.update(this.data)
      .then(
        success => {
          if (this.newImage.image) {
            this.imageService.create(this.newImage).then(
              data => {
                this.alertService.success('Servicio actualizado');
                this.dialogRef.close();
              }
            );
          } else {
            this.alertService.success('Servicio actualizado');
            this.dialogRef.close();
          }
        },
        error => {
          this.alertService.error('Error al actualizar el servicio', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.data.name = this.myForm.controls.name.value;
    this.data.price = this.myForm.controls.price.value;
    this.data.service_time = this.myForm.controls.service_time.value;
    this.data.image = this.myForm.controls.service_time.value;
    this.newImage.image = this.myForm.controls.image.value;
  }

}
