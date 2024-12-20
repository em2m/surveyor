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

    if (token === value) {
      token = value.split(" ").join("").replace(/\./g, "");
    }

    const translation = langKeys[token]?.translation;

    console.log(value, token, translation)

    return translation ? translation : value;
  }

}
