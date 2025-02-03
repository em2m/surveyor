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

    let translation = this.langKeys[token.toLowerCase()]?.translation || message;

    if (translation != null && variable != null) {
      translation = `${translation}  ${variable}`;
    }

    return translation || message;
  }


}
