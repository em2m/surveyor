import {AfterViewInit, Component} from "@angular/core";
import {SurveyorFormInputComponent} from "../../../form-input-component";

@Component({
  selector: 'surveyor-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss']
})
export class MdlCheckboxInputComponent extends SurveyorFormInputComponent implements AfterViewInit {
  private selected: string[] = [];

  ngAfterViewInit() {
    // Hack required to get MDL to bind event handlers after a view change
    window.dispatchEvent(new Event("load"));
  }

  setValue(val: any) {
    if (val) {
      super.setValue(val);
    } else {
      super.setValue([]);
    }
  }

  isSelected(selection: any) {
    return this.selected.indexOf(selection.value) > -1;
  }

  select(selection: any) {
    if (this.isSelected(selection)) {
      this.selected.splice(this.selected.indexOf(selection.value), 1);
    } else {
      this.selected.push(selection.value);
    }
    this.formControl.setValue(this.selected);
  }
}
