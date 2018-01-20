import {Component, Input, OnChanges, OnDestroy, OnInit} from "@angular/core";
import {Selection, Action} from "./action.model";
import {ActionService} from "./action.service";
import {Observable} from "rxjs/Observable";
import {ContextService} from "../../core/extension/context.service";
import {Subscription} from "rxjs/Subscription";

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
  primaryActions: Array<Action> = [];
  secondaryActions: Array<Action> = [];
  private contextSub: Subscription;

  constructor(private actionService: ActionService, private contextService: ContextService) {}

  ngOnInit() {
    this.findActions();
    /*
    this.contextSub = this.contextService.onContextChange()
      .subscribe(context => {

      });
      */
  }

  ngOnDestroy() {
    /*
    if (this.contextSub) {
      this.contextSub.unsubscribe();
    }
    */
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
