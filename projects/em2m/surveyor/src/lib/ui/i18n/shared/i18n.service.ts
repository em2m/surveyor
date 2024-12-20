import {Injectable} from '@angular/core';
import {ContextService} from "../../../core/extension/context.service";

@Injectable()
export class Surveyori18nService {

  langKeys: any;

  constructor(private ctx: ContextService) {
    this.detectLang();
  }

  detectLang() {
    //TODO set up subscription
    this.langKeys = this.ctx.getValue("i18n");
  }

  translate(message: string, variable?: string) {
    //variable for strings with var passed in
    if (!this.langKeys) {
      this.detectLang();
    }

    const token = message.split(" ").join("").replace(/\./g, "");
    const translation = this.langKeys[token]?.translation ? this.langKeys[token]?.translation : message;

    console.log(message, token, translation)

    return variable ? translation + variable : translation;

  }


}
