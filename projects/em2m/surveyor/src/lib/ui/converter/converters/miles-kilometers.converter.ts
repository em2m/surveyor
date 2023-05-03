import {Converter} from '../converter.component';
import {Injectable} from '@angular/core';

@Injectable()
export class MilesKilometersConverter extends Converter {

  constructor() {
    super();
  }

  fromSavedUnits(value: number): number {
    let mi;
    try {
      mi = value * 0.621371;
    } catch (e) {
      mi = 0;
    }
    return mi;
  }

  toSavedUnits(value: number): number {
    let km;
    try {
      km = value * 1.60934;
    } catch (e) {
      km = 0;
    }
    return km;
  }
}
