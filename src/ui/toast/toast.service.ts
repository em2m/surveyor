import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material";

@Injectable()
export class ToastService {

  constructor(private snackbar: MatSnackBar) {}

  info(message: string, title?: string) {
    this.snackbar.open(message, null, { horizontalPosition: 'center', duration: 3000 });
  }

  success(message: string, title?: string) {
    this.info(message, title);
  }

  error(message: string, title?: string) {
    this.info(message, title);
  }

  warning(message: string, title?: string) {
    this.info(message, title);
  }
}
