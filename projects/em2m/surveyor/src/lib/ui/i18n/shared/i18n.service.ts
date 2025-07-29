import {Injectable} from '@angular/core';
import {ContextService} from "../../../core/extension/context.service";
import {Subscription} from "rxjs";
import {AppConfig} from "../../../core/config/config.service";

@Injectable()
export class Surveyori18nService {
  private langKeys: any;
  private enabled: boolean = false;
  isDevLocale = false;

  app: string;

  constructor(private ctx: ContextService, private config: AppConfig) {
    this.langKeys = ctx.getValue("i18nTokens");
    this.enabled = this.ctx.getValue("i18nEnabled");
  }

  translate(message: string, token?: string) {
    this.enabled = this.ctx.getValue("i18nEnabled");
    this.langKeys = this.ctx.getValue("i18nTokens");
    const locale = this.ctx.getValue("i18nLocale");
    this.isDevLocale = locale === "dev";
    let translation;
    let uppercaseString = false;

    if (!message || typeof message === 'number') {
      return message;
    }
    const variableMarkersInMessage = (message.match(/%/g) || []).length;
    if (message.toUpperCase() === message) {
      uppercaseString = true;
    }

    if (!this.langKeys || !this.enabled) {
      //remove variable markers
      if (variableMarkersInMessage > 1) {
        message = message.replace(/[\s\%]/g, " ")
      }

       //TODO temp fix for non-i18n enabled apps
      if (message.includes("eventLabel")) {
        message = message.replace("eventLabel", "");
      }

      return message
    } else {
      if (!token && message) {
        //Case 1 - only message sent in... > remove () & special chars, handle vars,
        if (message.includes("(")) {
          const startingIndex = message.indexOf("(");
          const endingIndex = message.indexOf(")");
          token = message.slice(0, startingIndex - 1) + message.slice(startingIndex + 1, endingIndex) + message.slice(endingIndex + 1, message.length);
        } else {
          token = message;
        }

        //2 remove special chars
        let isRange = (variableMarkersInMessage > 1) && (token.includes("% -"));
        token = token.replace(/[\.\*\+\!\<\_\-\:\'\?\,\&\/\|]/g, "");

        //handle vars passed in, separate var by enclosing it in % %. Split on %, translate first section, second section is var (add as is), last section translate
        // this handles string that use % in phrase, not as symbol for a var
        const variableSymbolsInString = (token.match(/%/g) || []).length;
        if (variableSymbolsInString > 1 && !isRange) {
          //this preserves the separator
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
                let tokenTranslation = this.langKeys[token]?.translation;

                if (tokenTranslation) {
                  fullTranslation.push(tokenTranslation);
                } else if (token != "") {
                  let hasAsterisk = token.includes("**");
                  fullTranslation.push(!this.isDevLocale ? token : !hasAsterisk ? token + "**": token);
                }
              }
            } else if (token.trim() !== "") {
              //remove spaces, translate each element and re-insert into array
              let tokenTranslation = this.langKeys[token.replace(/\s/g, "").toLowerCase()]?.translation;

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
          token = token.split(" ").join("");
          translation = this.langKeys[token.toLowerCase()]?.translation;

          if (!translation) {
            let hasAsterisk = message.includes("**");
            translation = !this.isDevLocale ? message : !hasAsterisk ? message + "**" : message;
          }

          return uppercaseString ? translation.toUpperCase() : translation;
        }

      } else if (token && message) {
        //token should be passed without vars, chars, etc
        //symbols, (), etc added back in translation
        token = token.split(" ").join("").replace(/[\.\-\:\'\?\,\&\/]/g, "");
        translation = this.langKeys[token.toLowerCase()]?.translation;

        if (!translation) {
          let hasAsterisk = message.includes("**");
          translation = !this.isDevLocale ? message : !hasAsterisk ? message + "**" : message;
        }

        return uppercaseString ? translation.toUpperCase() : translation;
      } else {
        let hasAsterisk = message.includes("**");
        return !this.isDevLocale ? message : !hasAsterisk ? message + "**" : message;
      }
    }
  }

}
