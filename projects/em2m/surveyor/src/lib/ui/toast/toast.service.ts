import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {ContextService} from '../../core/extension/context.service';
import {Surveyori18nService} from '../i18n/shared/i18n.service';
import {ToastDuration} from './toast-duration.enum';
import {ToastComponent} from './toast.component';

@Injectable()
export class ToastService {

  constructor(private snackbar: MatSnackBar, private ctx: ContextService, private i18nService: Surveyori18nService) {}

  info(message: string, title?: string, duration?: number, token?: string) {
    const translatedMessage = this.i18nService.translate(message, token);
    this.snackbar.open(translatedMessage, null, { horizontalPosition: 'center', duration: duration || ToastDuration.SHORT });
  }

  success(message: string, title?: string, duration?: number, token?: string) {
    this.info(message, title, duration, token);
  }

  error(message: string, title?: string, duration?: number, token?: string, showCloseOption?: boolean) {
    const translatedMessage = this.i18nService.translate(message, token);

    this.snackbar.openFromComponent(ToastComponent, {
      data: { message: translatedMessage, showClose: showCloseOption || false },
      horizontalPosition: 'center',
      duration: duration || ToastDuration.MEDIUM
    });
  }

  warning(message: string, title?: string, duration?: number, token?: string) {
    this.info(message, title, duration, token);
  }
}
