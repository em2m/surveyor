import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ContextService} from '../../core/extension/context.service';
import {Surveyori18nService} from '../i18n/shared/i18n.service';
import {ToastDuration} from './toast-duration.enum';
import {ToastComponent} from './toast.component';

@Injectable()
export class ToastService {

  constructor(private snackbar: MatSnackBar, private ctx: ContextService, private i18nService: Surveyori18nService) {}

  info(message: string, title?: string, duration?: number, token?: string, showClose?: boolean) {
    const translatedMessage = this.i18nService.translate(message, token);
    if (showClose) {
      this.snackbar.openFromComponent(ToastComponent, {
        data: { message: translatedMessage, showClose: true },
        horizontalPosition: 'center',
        duration: duration
      });
    } else {
      this.snackbar.open(translatedMessage, null, { horizontalPosition: 'center', duration: duration || ToastDuration.SHORT });
    }
  }

  success(message: string, title?: string, duration?: number, token?: string, showClose?: boolean) {
    this.info(message, title, duration, token, showClose);
  }

  error(message: string, title?: string, duration?: number, token?: string, showClose?: boolean) {
    this.info(message, title, duration, token, showClose);
  }

  warning(message: string, title?: string, duration?: number, token?: string, showClose?: boolean) {
    this.info(message, title, duration, token, showClose);
  }
}
