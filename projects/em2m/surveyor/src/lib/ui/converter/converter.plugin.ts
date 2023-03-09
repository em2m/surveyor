import {Plugin} from '../../core/extension/extension.model';
import {CelsiusFahrenheitConverter} from './converters/celsius-fahrenheit.converter';

export let ConverterPlugin: Plugin = {
  name: 'Converter Plugin',
  extensions: {
    'surveyor:converter': [
      {value: CelsiusFahrenheitConverter, config: {type: 'celsius-fahrenheit'}},
    ],
  }
} as Plugin;
