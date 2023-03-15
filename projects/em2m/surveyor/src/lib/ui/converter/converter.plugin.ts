import {Plugin} from '../../core/extension/extension.model';
import {CelsiusFahrenheitConverter} from './converters/celsius-fahrenheit.converter';
import {FahrenheitCelsiusConverter} from './converters/fahrenheit-celsius.converter';

export let ConverterPlugin: Plugin = {
  name: 'Converter Plugin',
  extensions: {
    'surveyor:converter': [
      {value: CelsiusFahrenheitConverter, config: {type: 'celsius-fahrenheit'}},
      {value: FahrenheitCelsiusConverter, config: {type: 'fahrenheit-celsius'}},
    ],
  }
} as Plugin;
