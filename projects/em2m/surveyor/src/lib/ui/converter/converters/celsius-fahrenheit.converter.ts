import {Converter} from '../converter.component';
import {Injectable} from '@angular/core';

@Injectable()
export class CelsiusFahrenheitConverter extends Converter {

  constructor() {
    super();
  }

  fromSavedUnits(value: number): number {
    let celsius;
    try {
      celsius = (value - 32) * 5 / 9;
    } catch (e) {
      celsius = 0;
    }
    return celsius;
  }

  toSavedUnits(value: number): number {
    let fahrenheit;
    try {
      fahrenheit = value * 9 / 5 + 32;
    } catch (e) {
      fahrenheit = 0;
    }
    return fahrenheit;
  }
}
