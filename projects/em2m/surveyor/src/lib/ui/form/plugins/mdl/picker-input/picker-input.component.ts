import {AfterViewInit, Component} from "@angular/core";
import {SurveyorFormInputComponent} from "../../../form-input-component";
import {PickerService} from "../../../../picker/picker.service";

@Component({
  selector: 'mdl-picker-input',
  templateUrl: './picker-input.component.html',
  styleUrls: ['./picker-input.component.scss']
})
export class MdlPickerInputComponent extends SurveyorFormInputComponent implements AfterViewInit {
  label = "";

  constructor(private pickerService: PickerService) {
    super();
  }

  ngAfterViewInit() {
  }

  setValue(val: any) {
    if (val) {
      let options = this.controlDefinition.options;
      this.label = options.labelResolver(val);
      this.formControl.setValue(options.valueResolver(val));
    }
  }

  loadPicker() {
    let options = this.controlDefinition.options;
    if (!options.pickerOptions.params) {
      options.pickerOptions.params = {};
    }
    options.pickerOptions.params["value"] = this.formControl.value;
    this.pickerService.pick(options.picker, options.pickerOptions)
      .subscribe((value: any) => {
        console.log("Picked Value: ", value);
        this.setValue(value);
      });
  }

}
