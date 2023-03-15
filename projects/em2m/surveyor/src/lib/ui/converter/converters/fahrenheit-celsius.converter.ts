import {Converter} from '../converter.component';
import {Injectable} from '@angular/core';

@Injectable()
export class FahrenheitCelsiusConverter extends Converter {

  constructor() {
    super();
  }

  fromSavedUnits(value: number): number {
    return value * 9 / 5 + 32;
  }

  toSavedUnits(value: number): number {
    return (value - 32) * 5 / 9;
  }
}
