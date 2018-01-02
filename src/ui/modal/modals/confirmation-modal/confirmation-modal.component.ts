import {Component, OnInit} from "@angular/core";
import {Modal} from "../../modal.component";

@Component({
  selector: 'surveyor-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModal extends Modal implements OnInit {

  message: string;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.params) {
      this.message = this.params.message;
    }
  }

  submit() {
    this.submitWithValue(true);
  }

  cancel() {
    this.submitWithValue(false);
  }
}
