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

  translate(message: string) {
    if (!this.langKeys) {
      this.detectLang();
    }

    let variable;
    //no whitespace token
    let token = message.split(" ").join("").replace(/\./g, "");

    if (token.includes("%")) {
      let splitToken = token.split("%");
      token = splitToken[0];
      variable = splitToken[1];
    }

    let translation = this.langKeys[token]?.translation ? this.langKeys[token]?.translation : message;

    if (translation != null && variable != null) {
      translation = translation + variable;
    }

    return translation ? translation : message;
  }


}
