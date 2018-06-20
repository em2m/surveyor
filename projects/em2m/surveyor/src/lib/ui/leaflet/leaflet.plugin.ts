import {Plugin} from '../../core/extension/extension.model';
import {MapboxProvider} from './providers/mapbox/mapbox.provider';
import {MapquestProvider} from './providers/mapquest/mapquest.provider';
import {OpenStreetMapProvider} from './providers/openstreetmap/openstreetmap.provider';
import {ZoomControlProvider} from './providers/zoomcontrol/zoom-control.provider';
import {GoogleMapsProvider} from './providers/google-maps/google-maps.provider';

export let LeafletPlugin: Plugin = <Plugin> {
  name: 'Leaflet Plugin',
  extensions: {
    'surveyor:leaflet-base-layer': [
      {
        value: MapboxProvider,
        target: 'global',
        priority: 1
      },
      {
        value: MapquestProvider,
        target: 'global',
        priority: 2
      },
      {
        value: GoogleMapsProvider,
        target: 'global',
        priority: 4
      },
      {
        value: OpenStreetMapProvider,
        target: 'global',
        priority: 5
      }
    ],
    'surveyor:leaflet-control': [
      {
        value: ZoomControlProvider,
        target: 'global',
        priority: -1
      }
    ]
  }
};
