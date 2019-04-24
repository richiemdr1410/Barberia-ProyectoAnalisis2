import { Component, OnInit, Inject } from '@angular/core';
import { BarberService } from 'src/app/services/barber.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteBarberComponent } from '../delete-barber/delete-barber.component';
import { Barber } from 'src/app/models/barber.model';
import { ClientService } from 'src/app/services/client.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-edit-barber',
  templateUrl: './edit-barber.component.html',
  styleUrls: ['./edit-barber.component.scss']
})
export class EditBarberComponent implements OnInit {

  myForm: FormGroup;

  roles: Role[] = [
    {id: 1, name: 'admin', display_name: 'Administrador'},
    {id: 2, name: 'barber', display_name: 'Barbero'},
    {id: 3, name: 'client', display_name: 'Cliente'}
  ];

  newBarber = {
    id: 0,
    user_id: 0,
    name: '',
    last_name: '',
    second_last_name: '',
    email: '',
    telephone_number: 0,
    password: '',
    role_id: 2
  };

  constructor(
    private fb: FormBuilder,
    public service: ClientService,
    public barberService: BarberService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<DeleteBarberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Barber
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
    this.service.update(this.newBarber)
      .then(
        success => {
          this.alertService.success('Barbero editado');
          this.dialogRef.close();
        },
        error => {
          this.alertService.error('Error al editar el barbero', 5, error.ExceptionMessage);
        }
      );
  }

  getData(): any {
    this.newBarber.id = this.data.id;
    this.newBarber.user_id = this.myForm.controls.user_id.value;
    this.newBarber.name = this.myForm.controls.name.value;
    this.newBarber.last_name = this.myForm.controls.last_name.value;
    this.newBarber.second_last_name = this.myForm.controls.second_last_name.value;
    this.newBarber.email = this.myForm.controls.email.value;
    this.newBarber.telephone_number = this.myForm.controls.telephone_number.value;
    this.newBarber.password = this.myForm.controls.password.value;
    this.newBarber.role_id = this.myForm.controls.role.value;
  }
}
