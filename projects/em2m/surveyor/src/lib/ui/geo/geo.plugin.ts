import {Plugin} from '../../core/extension/extension.model';
import {MapboxGeoProvider} from './providers/mapbox/mapbox.provider';
import {MapquestGeoProvider} from './providers/mapquest/mapquest.provider';

export let GeoPlugin: Plugin = <Plugin> {
  name: 'Geo Plugin',
  extensions: {
    'surveyor:geo-provider': [
      { value: MapboxGeoProvider, config: {type: 'mapbox'} },
      { value: MapquestGeoProvider, config: {type: 'mapquest'} }
    ],
  }
};
