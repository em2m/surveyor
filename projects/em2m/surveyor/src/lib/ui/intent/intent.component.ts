import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  template: '<h1> {{actionId}} Not Found</h1>'

})
export class IntentComponent implements OnInit {

  public actionId: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.navigateByUrl(`/`);
  }

}
