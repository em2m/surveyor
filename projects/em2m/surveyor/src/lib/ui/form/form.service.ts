import {Injectable, Injector, Type} from '@angular/core';
import {ExtensionService} from '../../core/extension/extension.service';
import {Extension} from '../../core/extension/extension.model';
import {ControlOptions, ControlValidator, FormDefinition, AsyncControlValidator, Mask} from './form.model';
import {AsyncValidatorFn, UntypedFormBuilder, ValidatorFn} from '@angular/forms';
import {SurveyorFormInputComponent} from './form-input-component';
import {Surveyori18nService} from "../i18n/shared/i18n.service";

@Injectable()
export class FormService {

  private FORM_INPUT_EXTENSION_TYPE = 'surveyor:form-input';
  private FORM_MASK_EXTENSION_TYPE = 'surveyor:form-mask';
  private FORM_VALIDATOR_EXTENSION_TYPE = 'surveyor:form-validator';
  private FORM_ASYNC_VALIDATOR_EXTENSION_TYPE = 'surveyor:form-async-validator';

  private formExtensionTypes = {
    [this.FORM_INPUT_EXTENSION_TYPE]: {},
    [this.FORM_MASK_EXTENSION_TYPE]: {},
    [this.FORM_VALIDATOR_EXTENSION_TYPE]: {},
    [this.FORM_ASYNC_VALIDATOR_EXTENSION_TYPE]: {}
  };

  constructor(private extensionService: ExtensionService,
              private formBuilder: UntypedFormBuilder,
              private injector: Injector,
              private i18nService: Surveyori18nService) {
    this.registerExtensions();
  }

  private registerExtensions() {
    [
      this.FORM_INPUT_EXTENSION_TYPE,
      this.FORM_MASK_EXTENSION_TYPE,
      this.FORM_VALIDATOR_EXTENSION_TYPE,
      this.FORM_ASYNC_VALIDATOR_EXTENSION_TYPE
    ].forEach((extensionType: string) => {
      this.extensionService.getExtensionsForType(extensionType)
        .sort((a: Extension, b: Extension) => (b.priority || 0) - (a.priority || 0))
        .forEach((extension: Extension) => {
          let type = extension.config.type;
          if (type) {
            this.formExtensionTypes[extensionType][type] = extension.value;
          }
        });
    });
  }

  resolveInput(type: string): Type<SurveyorFormInputComponent> {
    let input = this.formExtensionTypes[this.FORM_INPUT_EXTENSION_TYPE][type];
    if (!input) { throw Error(`Unable to find surveyor:form-input of type: ${type}`); }
    return input;
  }

  resolveMask(mask: string, params: any): Type<any> {
    return this.resolveStaticFn(mask, params, this.FORM_MASK_EXTENSION_TYPE);
  }

  resolveValidator(validator: string, params: any): ValidatorFn {
    return this.resolveStaticFn(validator, params, this.FORM_VALIDATOR_EXTENSION_TYPE);
  }

  resolveAsyncValidator(validator: string, params: any): AsyncValidatorFn {
    return this.resolveStaticFn(validator, params, this.FORM_ASYNC_VALIDATOR_EXTENSION_TYPE);
  }

  resolveStaticFn(key: string, params: any, extensionType: string): any {
    let parts = key.split(':');
    let type = parts[0];
    let service = this.formExtensionTypes[extensionType][type];
    if (service.injectable) { this.injector.get(service); }
    if (!service) { throw Error(`Unable to find ${extensionType} of type ${type}`); }
    let fn = service[parts[1]];
    if (!fn) { throw Error(`Unable to find function ${parts[1]} on ${extensionType}:${type}`); }
    if (params instanceof Array) {
      return fn(...params);
    } else if (params) {
      return fn(params);
    } else {
      return fn;
    }
  }

  buildForm(controls: ControlOptions[]): FormDefinition {
    let extendedControls = controls.map((opts: ControlOptions) => {
      let component = opts.component;
      if (typeof component === 'string') {
        opts.component = this.resolveInput(component);
      }
      let mask: Mask = (opts.options || {}).mask || {};
      if (typeof mask.masker === 'string') {
        opts.options.mask.masker = this.resolveMask(mask.masker, mask.params);
      }
      opts.validators = (opts.validators || []).map((controlValidator: ControlValidator) => {
        let validator = controlValidator.validator;
        if (typeof validator === 'string') {
          controlValidator.validator = this.resolveValidator(validator, controlValidator.params);
        }
        return controlValidator;
      });
      opts.asyncValidators = (opts.asyncValidators || []).map((controlValidator: AsyncControlValidator) => {
        let validator = controlValidator.validator;
        if (typeof validator === 'string') {
          controlValidator.validator = this.resolveAsyncValidator(validator, controlValidator.params);
        }
        return controlValidator;
      });

      opts.label = this.i18nService.translate(opts.label);

      //select input options
      if (opts.options && opts.options?.selections ) {

        opts.options?.selections.forEach((selection) => {
          if (selection.label) {
            selection.label = this.i18nService.translate(selection.label);
          }
        });
      }

      if (opts.options && opts.options?.placeholder) {
        opts.options.placeholder = this.i18nService.translate(opts.options?.placeholder)
      }

      if (opts.options && opts.options?.pickerOptions && opts.options?.pickerOptions?.title) {
        opts.options.pickerOptions.title = this.i18nService.translate(opts.options?.pickerOptions?.title)
      }

      //select input options
      if (opts.validators) {
        opts.validators.forEach((validator) => {
          if (validator.message) {
            validator.message = this.i18nService.translate(validator.message);
          }
        });
      }

      return opts;
    });
    return new FormDefinition(extendedControls, this.formBuilder);
  }
}
