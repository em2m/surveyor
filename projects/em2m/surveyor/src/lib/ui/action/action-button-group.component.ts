import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Selection, Action} from './action.model';
import {ActionService} from './action.service';
import {Observable, Subscription} from 'rxjs';
import {ContextService} from '../../core/extension/context.service';

@Component({
  selector: 'surveyor-action-button-group',
  templateUrl: './action-button-group.component.html',
  styleUrls: ['./action-button-group.component.scss'],
})
export class ActionButtonGroupComponent implements OnInit, OnDestroy {

  @Input() actionTarget: string;
  @Input() selection: Observable<Selection> | Selection;
  @Input() raised = true;
  @Input() colored = true;
  @Input() iconOnly = false;
  @Input() icon = "far fa-ellipsis-v";
  @Input() miniFab = false;
  @Input() toolTip = "View Actions";
  primaryActions: Array<Action> = [];
  secondaryActions: Array<Action> = [];
  private contextSub: Subscription;
  private selectionSub: Subscription;
  private selectionValue: Selection;

  constructor(private actionService: ActionService, private contextService: ContextService) {}

  ngOnInit() {
    this.contextSub = this.contextService.onContextChange().subscribe(() => this.findActions());

    if (this.selection) {
      if (this.selection instanceof Selection) {
        this.updateSelectionValue(this.selection as Selection);
      } else {
        this.selectionSub = (this.selection as Observable<Selection>).subscribe(selection => {
          if (selection) {
            this.updateSelectionValue(selection);
          }
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.contextSub) {
      this.contextSub.unsubscribe();
    }
    if (this.selectionSub) {
      this.selectionSub.unsubscribe();
    }
  }

  private findActions() {
    setTimeout(() => {
      this.primaryActions = [];
      this.secondaryActions = [];
      this.actionService.findActions(this.actionTarget).forEach(action => {
        if (action && action.primary) {
          this.primaryActions.push(action);
        } else {
          this.secondaryActions.push(action);
        }

        if (this.selectionValue) {
          action.onSelectionChange(this.selectionValue);
        }
      });
    }, 0);
  }

  private updateSelectionValue(selection: Selection)  {
    this.selectionValue = selection;
    if (selection) {
      this.primaryActions.forEach(action => action.onSelectionChange(selection));
      this.secondaryActions.forEach(action => action.onSelectionChange(selection));
    }
  }
}
