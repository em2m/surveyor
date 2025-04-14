/* Copyright (c) 2019-2023 ElasticM2M */

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

import {Injectable} from "@angular/core";
import {IdentService} from "@em2m/protocol-sdk-ngx";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {CookieService as NgxCookieService} from "ngx-cookie";
import {DurationPipe} from "angular2-moment";
import * as _moment from "moment/moment";
import * as momentTZ from 'moment-timezone';
import * as Highcharts from "highcharts";
import {Subscription} from "rxjs";
import {ContextService} from "../../../core/extension/context.service";
import {AppConfig} from "../../../core/config/config.service";
const moment = _moment;

@Injectable({providedIn: 'root'})
export class Surveyori18nService {
  private jwtHelper = new JwtHelperService({});
  identService: IdentService;
  private cookieConfig: any;
  private isMobile = false;
  private langKeys: any;
  private amDurationPipe: DurationPipe;
  private locale;
  private accountTimezone: string;
  private account: any;
  private localeSub: Subscription;

  constructor(private ctx: ContextService,
              private http: HttpClient,
              private config: AppConfig,
              private cookieService: NgxCookieService,
  ) {
    this.cookieConfig = config.get().auth.cookie || {};
    this.identService = new IdentService(http, config.get().services.ident.endpoint, null);
    this.isMobile = !!this.config.get().isMobile || false;
    this.getAccount();
    this.langKeys = ctx.getValue("i18n");
    this.locale = ctx.getValue("i18nLocale");
    if (!this.langKeys || !this.locale) this.detectLang();
    this.amDurationPipe = new DurationPipe();

    this.localeSub = this.ctx.onValueChange("i18nLocale").subscribe( res => {
      this.detectLang(res);
    });
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token && this.jwtHelper.decodeToken(token) && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    const token = this.ctx.getValue(this.cookieConfig.name) || this.cookieService.get(this.cookieConfig.name);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return token;
    } else {
      return null;
    }
  }

  getCookie(key: string): string {
    if (this.isMobile) {
      this.ctx.getValue(key)
    } else {
      return this.cookieService.get(key);
    }
  }

  getAccount() {
    const jwt = this.getJwt();
    const accountId = jwt?.sub;
    this.identService.getAccount({accountId: accountId}).subscribe((res) => {
      if (res && res.account) {
        this.account = res.account;
        this.getTimeZone();
      }
    });
  }

  getTimeZone() {
    if (!this.account) {
      this.getAccount();
    }
    this.accountTimezone = this.account?.timeZone || this.ctx.getValue("organization")?.timeZone || moment.tz.guess();
  }

  getAccountId(): string {
    const jwt = this.getJwt();
    return jwt ? jwt.sub : null;
  }

  getJwt(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(this.getToken());
    }
    return null;
  }

  translate(message: any, token?: string) {
    let translation;

    if (!this.langKeys) {
      this.detectLang(this.locale, message, token);
    } else {
      if (!token && message) {
        //Case 1 -remove () starting and ending - these added back in translation
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
                let tokenTranslation = this.langKeys[token]?.translation || token;
                fullTranslation.push(tokenTranslation);
              }
            } else if (token.trim() !== "") {
              //remove spaces, translate each element and re-insert into array
              let tokenTranslation = this.langKeys[token.replace(/\s/g, "").toLowerCase()]?.translation || token;
              fullTranslation.push(tokenTranslation);
            }
          })

          return fullTranslation.join(" ");

        } else {
          //remove special chars && remove spaces
          if (token) {
            token = token.replace(/\s/g, "");
            translation = this.langKeys[token.toLowerCase()]?.translation;
          }

          return translation || message;
        }
      } else if (token && message) {
        //symbols, (), etc added back in translation
        token = token.split(" ").join("").replace(/[\.\*\<\_\-\!\:\'\?\,\&\/\|]/g, "");
        translation = this.langKeys[token.toLowerCase()]?.translation || message;

        return translation;
      } else {
        return message;
      }
    }
  }

  detectLang(locale?: string, message?: string, token?: string) {
    this.identService.detectLang({locale: locale}).subscribe(res => {
      if (res && res.langKeys && res.locale) {
        this.ctx.setValue("i18n", res.langKeys, {broadcast: false, storage: 'LOCAL'});
        this.ctx.setValue("i18nLocale", res.locale, {broadcast: false, storage: 'LOCAL'});
        this.langKeys = res.langKeys;
        this.locale = res.locale;

        //if had to detectLang first, now translate
        if (message) {
          this.translate(message, token);
        }

        this.setHighchartsLang();
      }
    })
  }

  translateWithDuration(value: string, pipeParam: string): string {
    //get piped value, remove numerical value, translate and rejoin
    let duration = this.amDurationPipe.transform(value, pipeParam);
    let indexTest = duration?.match(/[a-zA-Z]/).index;
    let numString = duration.substring(0, indexTest - 1);
    let textString = duration.substring(indexTest, duration.length);
    let translatedArr = [];
    translatedArr.push(numString)
    translatedArr.push(this.translate(textString));

    return translatedArr.join(" ");
  }


  //todo can use datePipe and pass in locale for this instance of it

  translateDate(published: any, format: string): string  {
    if (!this.accountTimezone) {
      this.getTimeZone();
    }

    let localLocale = momentTZ(published);
    localLocale.locale(this.locale);
    return localLocale.tz(this.accountTimezone).format(format);
  }

  translateTimeAgo(time: any): string {
    if (!this.accountTimezone) {
      this.getTimeZone();
    }

    let localLocale = momentTZ(time);
    localLocale.locale(this.locale);
    return localLocale.fromNow();
  }

  //for those times already adjusted to tz
  timeToLocale(time: number, format: string): string {
    let localLocale = moment(time);
    localLocale.locale(this.locale);
    return localLocale.format(format);
  }

  //Yesterday at 10pm... Last monday at...
  timeToLocaleCalendar(time: number): string {
    return moment(time).locale(this.locale).calendar();
  }

  //to handle moment.humanize() - 8 hours...
  translateMomentHumanize(humanizeString: string): string {
    let humanizeStringSplit = humanizeString.split(" ");
    let translatedString = [];
    for (let s of humanizeStringSplit) {
      let translation = this.translate(s);
      translation = translation?.toLowerCase();
      translatedString.push(translation);
    }

    return translatedString.join(" ");
  }

  setHighchartsLang() {
    const loading = `${this.translate("Loading")} ...`;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const translatedMonths = [];
    for (let month of months) {
      translatedMonths.push(this.translate(month));
    }

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const translatedWeekdays = [];
    for (let day of weekdays) {
      translatedWeekdays.push(this.translate(day));
    }

    const shortMonths = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const translatedShortMonths = [];
    for (let month of shortMonths) {
      translatedShortMonths.push(this.translate(month));
    }

    Highcharts.setOptions({
      lang: {
        loading: loading,
        months: translatedMonths,
        weekdays: translatedWeekdays,
        shortMonths: translatedShortMonths,
        // rangeSelectorFrom: "De",
        // rangeSelectorTo: "Até",
        // rangeSelectorZoom: "Periodo",
        // downloadPNG: 'Download imagem PNG',
        // downloadJPEG: 'Download imagem JPEG',
        // downloadPDF: 'Download documento PDF',
        // downloadSVG: 'Download imagem SVG'
      }
    });
  }
}
