import { Component, OnInit } from '@angular/core';

import { AlertService } from 'src/app/services/alert.service';
import { Alert, AlertType } from 'src/app/models/alert.model';


@Component({
  selector: 'app-alert',
  templateUrl: 'alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})

export class AlertComponent implements OnInit {
  alert: any;
  dismiss: boolean;


  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.initializeAlert();
  }

  initializeAlert() {
    this.dismiss = false;
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        // clear alerts when an empty alert is received
        this.dismiss = true;
        this.alert = {};
        return;
      } else {
        this.addAlert(alert);
      }
    });
  }

  addAlert(alert: Alert) { // 5 seconds by default
    this.dismiss = false;
    this.alert = {};
    this.alert = alert;

    if (alert.delay > 0) {
      setTimeout(() => {
        this.dismiss = true;
      }, alert.delay * 1000);
    }

  }

  removeAlert() {
    this.dismiss = true;
    setTimeout(() => {
      this.alert = {};
    }, 1000);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
