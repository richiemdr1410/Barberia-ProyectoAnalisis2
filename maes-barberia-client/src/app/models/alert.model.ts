export class Alert {
  type: AlertType; // Success, Error, Info, Warning
  message: string; // First line of the alert
  delay: number;   // Time in secconds for dissmiss by defaul 5 if 0 alert will be dimissed manually.
  title: string;   // Title of the alert
  extra: string;   // Seccond line of the message
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
