import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-custom-snackbar',
  template: `
    <div class="snack-container">
      <span class="snack-message">{{ data.message }}</span>
      <mat-icon (click)="snackBarRef.dismiss()"
        class="close-button" [class.hidden]="!data.showClose">close
      </mat-icon>
    </div>
  `,
  standalone: true,
  imports: [
    NgIf,
    MatIconModule
  ],
  styles: [`
    .snack-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .snack-message {
      flex: 1;
    }

    .close-button {
      cursor: pointer;
      font-size: 20px;
      margin-left: 8px;
    }
    .hidden {
      visibility: hidden;
      pointer-events: none;
    }
  `]
})
export class ToastComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ToastComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
