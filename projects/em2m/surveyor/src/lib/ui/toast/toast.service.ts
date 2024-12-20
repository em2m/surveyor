import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ContextService} from '../../core/extension/context.service';
import {Surveyori18nService} from "../i18n/shared/i18n.service";

@Injectable()
export class ToastService {

  constructor(private snackbar: MatSnackBar, private ctx: ContextService, private i18nService: Surveyori18nService) {}

  info(message: string, title?: string, variable?: string) {

    const translatedMessage = this.i18nService.translate(message, variable);
    this.snackbar.open(translatedMessage, null, { horizontalPosition: 'center', duration: 3000 });
  }

  success(message: string, title?: string, variable?: string) {
    this.info(message, title, variable);
  }

  error(message: string, title?: string, variable?: string) {
    this.info(message, title, variable);
  }

  warning(message: string, title?: string) {
    this.info(message, title);
  }
}
