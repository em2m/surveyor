import {Component, OnInit} from "@angular/core";
import {Modal} from "../../modal.component";

@Component({
  selector: 'surveyor-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModal extends Modal implements OnInit {

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
