import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';
import { BarberService } from 'src/app/services/barber.service';

@Component({
  selector: 'app-add-barber',
  templateUrl: './add-barber.component.html',
  styleUrls: ['./add-barber.component.scss']
})
export class AddBarberComponent implements OnInit {

  myForm: FormGroup;

  newBarber = {
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: '',
    password: '',
    role_id: 2
  };

  constructor(
    private fb: FormBuilder,
    public service: ClientService,
    public barberService: BarberService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddBarberComponent>,
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: new FormControl(''),
      last_name: new FormControl(''),
      second_last_name: new FormControl(''),
      email: new FormControl(''),
      telephone_number: new FormControl(''),
      password: new FormControl('')
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  create(): void {
    this.getData();
    this.service.create(this.newBarber)
      .then(
        success => {
        },
        error => {
          this.alertService.error('Error al crear el barbero', 5, error.ExceptionMessage);
        }
      );

      this.barberService.create(this.newBarber).then(
        success => {
          this.alertService.success('Barbero creado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al crear el barbero', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newBarber.name = this.myForm.controls.name.value;
    this.newBarber.last_name = this.myForm.controls.last_name.value;
    this.newBarber.second_last_name = this.myForm.controls.second_last_name.value;
    this.newBarber.email = this.myForm.controls.email.value;
    this.newBarber.telephone_number = this.myForm.controls.telephone_number.value;
    this.newBarber.password = this.myForm.controls.password.value;
  }

}
