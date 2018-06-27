import {ControlProvider} from '../../leaflet.model';
import {Injectable} from '@angular/core';
import {Control, DomEvent, DomUtil, Map} from 'leaflet';

@Injectable()
export class GoogleStreetViewControlProvider implements ControlProvider {

  config: any;

  constructor() {}

  provide(map: Map): Control {
    return new GoogleStreetViewControl();
  }
}

export class GoogleStreetViewControl extends Control {

  private map: Map;

  constructor() {
    super({ position: 'topleft'});
  }

  onAdd?(map: Map): HTMLElement {
    this.map = map;

    let container = DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-icon');
    container.title = 'View in google maps';
    let link: any = DomUtil.create('i', 'fa fa-external-link leaflet-fa-icon', container);

    DomEvent.on(link, 'click', this._click, this);

    return container;
  }

  _click() {
    let mapCenter = this.map.getCenter();
    let url = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${mapCenter.lat},${mapCenter.lng}&pitch=0&fov=80`;
    window.open(url, '_blank');
  }
}
