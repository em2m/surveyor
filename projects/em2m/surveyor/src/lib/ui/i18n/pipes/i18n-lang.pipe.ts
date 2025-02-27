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
    let translation;

    //this is for validation messages etc passed from class file (error messages on form field etc)
    if (token && token === value) {
      //Case 1 - only value sent in... > remove () & special chars, handle vars,
      if (value.includes("(")) {
        const startingIndex = value.indexOf("(");
        const endingIndex = value.indexOf(")");
        token = value.slice(0, startingIndex - 1) + value.slice(startingIndex + 1, endingIndex) + value.slice(endingIndex + 1, value.length);
      } else {
        token = value;
      }

      //2 remove special chars
      token = token.replace(/[\.\-\:\'\?\,\&\/]/g, "");

      if (token.includes("%")) {
        //preserves separator
        let tokenSplit = token.split(/(?=%)/);
        let fullTranslation = [];

        // find index of element with variable marker - %
        tokenSplit.forEach((token, index) => {
          if (token.includes("%")) {
            //remove % then add to array
            //to handle string var string...
            token.split(" ").forEach((variableString, index) => {
              if (index == 0) {
                //pass var as is
                fullTranslation.push(variableString.replace(/%/g, ""));
              } else {
                let tokenTranslation = langKeys[variableString.replace(/\s/g, "").toLowerCase()]?.translation || token;
                fullTranslation.push(tokenTranslation);
              }
            })
          } else if (token.trim() !== "") {
            //remove spaces, translate each element and re-insert into array
            let tokenTranslation = langKeys[token.replace(/\s/g, "").toLowerCase()]?.translation || token;
            fullTranslation.push(tokenTranslation);
          }
        })

        return fullTranslation.join(" ");

      } else {
        //remove special chars && remove spaces
        token = token.replace(/\s/g, "");
        translation = langKeys[token.toLowerCase()]?.translation || value;

        return translation;
      }

    } else if (token) {
      //token should be passed without vars, chars, etc
      //symbols, (), etc added back in translation
      token = token.split(" ").join("").replace(/[\.\-\:\'\?\,\&\/]/g, "");
      translation = langKeys[token.toLowerCase()]?.translation || value;

      return translation;
    } else {
      return value;
    }
  }
}
