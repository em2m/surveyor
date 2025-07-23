import * as L from 'leaflet';
import {ControlProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {AppConfig} from '../../../../core/config/config.service';
import {Control} from 'leaflet';
import {Surveyori18nService} from "../../../i18n/shared/i18n.service";

@Injectable()
export class ZoomControlProvider implements ControlProvider {

  config: any;

  constructor(private appConfig: AppConfig,
              private i18nService: Surveyori18nService) {}

  provide(): Control {
    return L.control.zoom({
      position: 'topleft',
      zoomInTitle: this.i18nService.translate('Zoom in'),
      zoomOutTitle: this.i18nService.translate('Zoom out')
    });
  }
}
