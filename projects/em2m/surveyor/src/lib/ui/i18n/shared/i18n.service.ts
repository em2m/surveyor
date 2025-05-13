import {Injectable} from '@angular/core';
import {ContextService} from "../../../core/extension/context.service";
import {Subscription} from "rxjs";
import {AppConfig} from "../../../core/config/config.service";

@Injectable()
export class Surveyori18nService {
  private langKeys: any;
  private enabled: boolean = false;

  constructor(private ctx: ContextService, config: AppConfig) {
    this.enabled = config.get().i18n?.enabled || false;
    this.langKeys = ctx.getValue("i18nTokens");
  }

  translate(message: string, token?: string) {
    this.langKeys = this.ctx.getValue("i18nTokens");
    let translation;
    let uppercaseString = false;
    if (!message) {
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
        token = token.replace(/[\.\*\!\<\_\-\:\'\?\,\&\/\|]/g, "");

        //handle vars passed in, separate var by enclosing it in % %. Split on %, translate first section, second section is var (add as is), last section translate
        // this handles string that use % in phrase, not as symbol for a var
        const variableSymbolsInString = (token.match(/%/g) || []).length;
        if (variableSymbolsInString > 1) {
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
                tokenTranslation ? fullTranslation.push(tokenTranslation) : fullTranslation.push(token + "**");
              }
            } else if (token.trim() !== "") {
              //remove spaces, translate each element and re-insert into array
              let tokenTranslation = this.langKeys[token.replace(/\s/g, "").toLowerCase()]?.translation;
              tokenTranslation ? fullTranslation.push(tokenTranslation) : fullTranslation.push(token + "**");
            }
          })

          return uppercaseString ? fullTranslation.join(" ").toUpperCase() : fullTranslation.join(" ");

        } else {
          //remove special chars && remove spaces
          token = token.split(" ").join("");
          translation = this.langKeys[token.toLowerCase()]?.translation ? this.langKeys[token.toLowerCase()]?.translation : message + "**";
          return uppercaseString ? translation.toUpperCase() : translation;
        }

      } else if (token && message) {
        //token should be passed without vars, chars, etc
        //symbols, (), etc added back in translation
        token = token.split(" ").join("").replace(/[\.\-\:\'\?\,\&\/]/g, "");
        translation = this.langKeys[token.toLowerCase()]?.translation ? this.langKeys[token.toLowerCase()]?.translation : message + "**";

        return uppercaseString ? translation.toUpperCase() : translation;
      } else {
        return message + "**";
      }
    }
  }
}
