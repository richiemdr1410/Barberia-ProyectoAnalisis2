import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  newClient = {
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: '',
    password: '',
    role_id: 3
  };

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ClientService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddClientComponent>,
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
    this.service.create(this.newClient)
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
    this.newClient.name = this.myForm.controls.name.value;
    this.newClient.last_name = this.myForm.controls.last_name.value;
    this.newClient.second_last_name = this.myForm.controls.second_last_name.value;
    this.newClient.email = this.myForm.controls.email.value;
    this.newClient.telephone_number = this.myForm.controls.telephone_number.value;
    this.newClient.password = this.myForm.controls.password.value;
  }

}
