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
import {Surveyori18nService} from "../shared/i18n.service";

@Pipe({
  name: 'i18n'
})
export class Surveyori18nLangPipe implements PipeTransform {
  enabled: boolean = false;
  isDevLocale = false;

  constructor(private ctx: ContextService, private i18nService: Surveyori18nService) {
    this.enabled = this.ctx.getValue("i18nEnabled");
  }

  transform(value: string, token: string): any {
    this.enabled = this.ctx.getValue("i18nEnabled");
    const langKeys = this.ctx.getValue("i18nTokens");
    const locale = this.ctx.getValue("i18nLocale");
    this.isDevLocale = locale === "dev";

    if (!value) { return; }
    let uppercaseString = false;
    let translation;

    const variableMarkersInMessage = (value.match(/%/g) || []).length;
    if (value.toUpperCase() === value) {
      uppercaseString = true;
    }

    if (!langKeys || !this.enabled) {
      //remove variable markers
      if (variableMarkersInMessage > 1) {
        value = value.replace(/[\s\%]/g, " ")
      }
      return value
    }

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
      token = token.replace(/[\.\*\<\!\_\-\:\'\?\,\&\/\|]/g, "");

      //handle vars passed in, separate var by enclosing it in % %. Split on %, translate first section, second section is var (add as is), last section translate
      // this handles string that use % in phrase, not as symbol for a var
      const variableSymbolsInString = (token.match(/%/g) || []).length;
      if (variableSymbolsInString > 1) {
        //preserves separator
        let tokenSplit = token.split(/(?=%)/);
        let fullTranslation = [];
        let varStringRun = false;

        // find index of element with variable marker - %
        tokenSplit.forEach((token) => {
          //this includes 2 sections: first var and last section too (bc split on %)
          if (token.includes("%")) {
            if (!varStringRun) {
              //remove % then add to array as is (don't translate variable)
              fullTranslation.push(token.replace(/%/g, ""));
              varStringRun = true;
            } else {
              token = token.replace(/[\s\%]/g, "").toLowerCase();
              //if variable already run, translate this section
              let tokenTranslation = langKeys[token]?.translation;

              if (tokenTranslation) {
                fullTranslation.push(tokenTranslation);
              } else if (token != "") {
                let hasAsterisk = token.includes("**");
                fullTranslation.push(!this.isDevLocale ? token : !hasAsterisk ? token + "**": token);
              }
            }
          } else if (token.trim() !== "") {
            //remove spaces, translate each element and re-insert into array
            let tokenTranslation = langKeys[token.replace(/\s/g, "").toLowerCase()]?.translation;

            if (tokenTranslation) {
              fullTranslation.push(tokenTranslation);
            } else {
              let hasAsterisk = token.includes("**");
              fullTranslation.push(!this.isDevLocale ? token : !hasAsterisk ? token + "**": token);
            }
          }
        })

        return uppercaseString ? fullTranslation.join(" ").toUpperCase() : fullTranslation.join(" ");

      } else {
        //remove special chars && remove spaces
        token = token.replace(/\s/g, "");
        translation = langKeys[token.toLowerCase()]?.translation;

        if (!translation) {
          let hasAsterisk = value.includes("**");
          translation = !this.isDevLocale ? value : !hasAsterisk ? value + "**" : value;
        }

        return uppercaseString ? translation.toUpperCase() : translation;
      }

    } else if (token) {
      //token should be passed without vars, chars, etc
      //symbols, (), etc added back in translation
      token = token.split(" ").join("").replace(/[\.\*\!\<\_\-\:\'\?\,\&\/\|]/g, "");
      translation = langKeys[token.toLowerCase()]?.translation;

      if (!translation) {
        let hasAsterisk = value.includes("**");
        translation = !this.isDevLocale ? value : !hasAsterisk ? value + "**" : value;
      }

      return uppercaseString ? translation.toUpperCase() : translation;
    } else {
      let hasAsterisk = value.includes("**");
      return !this.isDevLocale ? value : !hasAsterisk ? value + "**" : value;
    }
  }
}
