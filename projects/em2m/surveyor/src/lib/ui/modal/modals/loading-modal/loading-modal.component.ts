import {Component, OnInit} from '@angular/core';
import {Modal} from '../../modal.component';

@Component({
  selector: 'surveyor-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.scss'],
})
export class LoadingModal extends Modal implements OnInit {

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
