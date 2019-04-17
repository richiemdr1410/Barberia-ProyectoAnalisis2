import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: ClientService,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<EditClientComponent>,
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

  

}
