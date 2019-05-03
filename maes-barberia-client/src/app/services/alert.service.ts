import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable ,  Subject } from 'rxjs';
import { Alert, AlertType } from '../models/alert.model';


@Injectable({providedIn: 'root'})
export class AlertService {

  private subject = new Subject<Alert>();

  constructor(private router: Router) { }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success( message: string, delay: number = 5, title?: string, extra?: string) {
    this.alert(AlertType.Success, message, delay, title, extra);
  }

  error(message: string, delay: number = 5, title?: string, extra?: string) {
    this.alert(AlertType.Error, message, delay, title, extra);
  }

  info(message: string, delay: number = 5, title?: string, extra?: string) {
    this.alert(AlertType.Info, message, delay, title, extra);
  }

  warn(message: string, delay: number = 5, title?: string, extra?: string) {
    this.alert(AlertType.Warning, message, delay, title, extra);
  }

  alert(type: AlertType, message: string, delay: number = 5, title?: string, extra?: string) {
    this.clear();
    this.subject.next(<Alert>{ type: type, message: message, delay: delay, title: title, extra: extra });
  }

  responseErrors(responseErrors: any) {
    const keys = Object.keys(responseErrors);
    let errors = '';
    keys.forEach(function(key) {
      if (responseErrors[key][0] === 'validation.clean_phone') {
          errors += 'Invalid ' + keys + ' number';
      } else {
        errors += responseErrors[key][0] + '\n';
      }
    });
    this.error(errors);
  }

  clear() {
    this.subject.next();
  }
}
