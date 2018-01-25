import {ControlProvider} from "../../leaflet.model";
import {Injectable} from "@angular/core";
import {Control, DomEvent, DomUtil, Map} from "leaflet";

@Injectable()
export class GoogleMapsControlProvider implements ControlProvider {

  config: any;

  constructor() {}

  provide(map: Map): Control {
    return new GoogleMapsControl();
  }
}

export class GoogleMapsControl extends Control {

  private map: Map;

  constructor() {
    super({ position: "topleft"});
  }

  onAdd?(map: Map): HTMLElement {
    this.map = map;

    let container = DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-icon');
    container.title = 'View in google maps';
    let link: any = DomUtil.create('i', 'fa fa-fw fa-external-link leaflet-fa-icon', container);

    DomEvent.on(link, 'click', this._click, this);

    return container;
  }

  _click() {
    let mapCenter = this.map.getCenter();
    let url = `https://www.google.com/maps/search/?api=1&query=${mapCenter.lat},${mapCenter.lat}`;
    window.open(url, "_blank");
  }
}
