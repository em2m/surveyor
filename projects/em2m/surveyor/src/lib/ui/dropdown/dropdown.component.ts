import {Component, OnDestroy, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'surveyor-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnDestroy {

  showDropdown = false;
  private routerSub: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSub = this.router.events
      .subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.showDropdown = false;
        }
      });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
