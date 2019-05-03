import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Role } from 'src/app/models/role.model';
import { Client } from 'src/app/models/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  myForm: FormGroup;

  roles: Role[] = [
    {id: 1, name: 'admin', display_name: 'Administrador'},
    {id: 2, name: 'barber', display_name: 'Barbero'},
    {id: 3, name: 'client', display_name: 'Cliente'}
  ];

  newClient = {
    id: 0,
    user_id: 0,
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: 0,
    password: '',
    role_id: 3,
    error: false,
    message: ''
  };

  constructor(
    private fb: FormBuilder,
    public service: ClientService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      user_id: new FormControl(this.data.user_id),
      name: new FormControl(this.data.name),
      last_name: new FormControl(this.data.last_name),
      second_last_name: new FormControl(this.data.second_last_name),
      email: new FormControl(this.data.email),
      telephone_number: new FormControl(this.data.telephone_number),
      password: new FormControl(this.data.password),
      role: new FormControl(this.data.role_id)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  update(): void {
    this.getData();
    this.service.update(this.newClient)
      .then(
        success => {
          this.alertService.success('Cliente editado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al editar el cliente', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newClient.id = this.data.id;
    this.newClient.user_id = this.myForm.controls.user_id.value;
    this.newClient.name = this.myForm.controls.name.value;
    this.newClient.last_name = this.myForm.controls.last_name.value;
    this.newClient.second_last_name = this.myForm.controls.second_last_name.value;
    this.newClient.email = this.myForm.controls.email.value;
    this.newClient.telephone_number = this.myForm.controls.telephone_number.value;
    this.newClient.password = this.myForm.controls.password.value;
    this.newClient.role_id = this.myForm.controls.role.value;
  }

}
