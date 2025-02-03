/* Copyright (c) 2019-2023 ElasticM2M  */

///
/// ELASTIC M2M Inc. CONFIDENTIAL
/// __________________
///
/// Copyright (c) 2019-2023 Elastic M2M Incorporated, All Rights Reserved.
///
/// NOTICE:  All information contained herein is, and remains
/// the property of Elastic M2M Incorporated
///
/// The intellectual and technical concepts contained
/// herein are proprietary to Elastic M2M Incorporated
/// and may be covered by U.S. and Foreign Patents,  patents in
/// process, and are protected by trade secret or copyright law.
/// Dissemination of this information or reproduction of this material
/// is strictly forbidden unless prior written permission is obtained
/// from Elastic M2M Incorporated.
///

import { Pipe, PipeTransform } from '@angular/core';
import {ContextService} from '../../../core/extension/context.service';

@Pipe({
  name: 'i18n'
})
export class Surveyori18nLangPipe implements PipeTransform {
  constructor(private ctx: ContextService) {}

  transform(value: string, token: string): any {
    const langKeys = this.ctx.getValue("i18n");
    if (!value) { return; }
    if (!langKeys) {return value}
    let variable;

    //this is for validation messages etc passed from class file
    if (token === value) {
      //removes spaces to turn it into token
      token = value.split(" ").join("").replace(/\./g, "");
    }

    //for values such as "xt-4200..."
    if (token.includes("-")) {
      const index = token.indexOf("-");
      token = token.slice(0, index) + token.slice(index + 1, token.length);
      //for values such as "fuel level (%)" ...
    } else if (token.includes("(")) {
      const startingIndex = token.indexOf("(");
      const endingIndex = token.indexOf(")");
      token = token.slice(0, startingIndex) + token.slice(endingIndex, token.length - 1);
      //variables passed in that would not be in main key list
    } else if (token.includes("%")) {
      let tokenSplit = token.split("%");
      variable = tokenSplit[1]
      token = tokenSplit[0]
    }

    let translation = langKeys[token.toLowerCase()]?.translation;
    console.log(value, token, translation)

    if (translation != null && variable != null) {
      translation = `${translation} ${variable}`;
    }

    return translation || value;
  }

}
