import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatNativeDateModule,
  MatSelectModule,
  MatChipsModule
} from '@angular/material';
import {MaterialFormPlugin} from './material-form-plugin';
import {MaterialSelectInputComponent} from './select/mat-select.component';
import {MaterialTextInputComponent} from './text/mat-text.component';
import {MaterialTextAreaInputComponent} from './textarea/mat-textarea.component';
import {MaterialCheckboxInputComponent} from './checkbox/mat-checkbox.component';
import {MaterialPickerInputComponent} from './picker/mat-picker.component';
import {MaterialPasswordInputComponent} from './password/mat-password.component';
import {MaterialDollarsComponent} from './dollars/mat-dollars.component';
import {MaterialDateInputComponent} from './date/mat-date.component';
import {MaterialChipsInputComponent} from './chips/mat-chips.component';

export * from './material-form-plugin';
export * from './select/mat-select.component';
export * from './text/mat-text.component';
export * from './textarea/mat-textarea.component';
export * from './checkbox/mat-checkbox.component';
export * from './picker/mat-picker.component';
export * from './password/mat-password.component';
export * from './date/mat-date.component';
export * from './chips/mat-chips.component';

const components = [
  MaterialSelectInputComponent,
  MaterialTextInputComponent,
  MaterialTextAreaInputComponent,
  MaterialCheckboxInputComponent,
  MaterialPickerInputComponent,
  MaterialPasswordInputComponent,
  MaterialDollarsComponent,
  MaterialDateInputComponent,
  MaterialChipsInputComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ...components
  ],
  declarations: [
    ...components
  ],
  entryComponents: [
    ...components
  ]
})
export class MaterialFormModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialFormModule,
      providers: [
        {provide: 'PLUGIN', useValue: MaterialFormPlugin, multi: true}
      ]
    };
  }
}
