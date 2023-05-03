import {Plugin} from '../../core/extension/extension.model';
import {CelsiusFahrenheitConverter} from './converters/celsius-fahrenheit.converter';
import {FahrenheitCelsiusConverter} from './converters/fahrenheit-celsius.converter';
import {MilesKilometersConverter} from './converters/miles-kilometers.converter';
import {KilometersMilesConverter} from './converters/kilometers-miles.converter';

export let ConverterPlugin: Plugin = {
  name: 'Converter Plugin',
  extensions: {
    'surveyor:converter': [
      {value: CelsiusFahrenheitConverter, config: {type: 'celsius-fahrenheit'}},
      {value: FahrenheitCelsiusConverter, config: {type: 'fahrenheit-celsius'}},
      {value: MilesKilometersConverter, config: {type: 'miles-kilometers'}},
      {value: KilometersMilesConverter, config: {type: 'kilometers-miles'}},
    ],
  }
} as Plugin;
