import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContextService} from '../../core/extension/context.service';
import {Surveyori18nService} from "../i18n/shared/i18n.service";

@Injectable()
export class ToastService {

  constructor(private snackbar: MatSnackBar, private ctx: ContextService, private i18nService: Surveyori18nService) {}

  info(message: string, title?: string, duration?: number, token?: string) {
    this.snackbar.open(message, null, { horizontalPosition: 'center', duration: 3000 });
  }

  success(message: string, title?: string, duration?: number, token?: string) {
    this.info(message, title);
  }

  error(message: string, title?: string, duration?: number, token?: string) {
    this.info(message, title);
  }

  warning(message: string, title?: string, duration?: number, token?: string) {
    this.info(message, title);
  }
}
