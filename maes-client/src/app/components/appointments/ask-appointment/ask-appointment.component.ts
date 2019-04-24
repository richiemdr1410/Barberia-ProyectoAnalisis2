import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ask-appointment',
  templateUrl: './ask-appointment.component.html',
  styleUrls: ['./ask-appointment.component.scss']
})
export class AskAppointmentComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AskAppointmentComponent>
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  agendar(): void {
    this.router.navigate(['/appointments']);
    this.dialogRef.close();
  }

}
