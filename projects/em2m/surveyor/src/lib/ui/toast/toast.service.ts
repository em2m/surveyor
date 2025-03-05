import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ToastService {

  constructor(private snackbar: MatSnackBar) {}

  info(message: string, title?: string, durationValue?: number) {
    this.snackbar.open(message, null, { horizontalPosition: 'center', duration: durationValue ? durationValue : 3000 });
  }

  success(message: string, title?: string, duration?: number) {
    this.info(message, title, duration);
  }

  error(message: string, title?: string, duration?: number) {
    this.info(message, title, duration);
  }

  warning(message: string, title?: string, duration?: number) {
    this.info(message, title, duration);
  }
}
