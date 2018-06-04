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
  @Input() selection: Observable<Selection>;
  @Input() raised = true;
  @Input() colored = true;
  @Input() iconOnly = false;
  primaryActions: Array<Action> = [];
  secondaryActions: Array<Action> = [];
  private contextSub: Subscription;

  constructor(private actionService: ActionService, private contextService: ContextService) {}

  ngOnInit() {
    this.contextSub = this.contextService.onContextChange()
      .subscribe(context => {
        this.findActions();
      });
  }

  ngOnDestroy() {
    if (this.contextSub) {
      this.contextSub.unsubscribe();
    }
  }

  private findActions() {
    this.primaryActions = [];
    this.secondaryActions = [];
    this.actionService.findActions(this.actionTarget).forEach(action => {
      if (action.primary) {
        this.primaryActions.push(action);
      } else {
        this.secondaryActions.push(action);
      }
      action.init(this.selection);
    });
  }
}
