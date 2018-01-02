import {
  Component, OnInit, Input, ComponentFactoryResolver, Type, ViewContainerRef, ViewChild, OnDestroy
} from "@angular/core";
import {SidenavService} from "./sidenav.service";
import {Extension} from "../../../core/extension/extension.model";
import {MenuContribution} from "../../../ui/menu/menu.contribution";

@Component({
  selector: 'surveyor-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class ApplicationSidenavComponent implements OnInit, OnDestroy {

  @Input() position? = "left";
  @ViewChild('sidenavTop', {read: ViewContainerRef}) sidenavTop: any;
  @ViewChild('sidenavMiddle', {read: ViewContainerRef}) sidenavMiddle: any;
  @ViewChild('sidenavBottom', {read: ViewContainerRef}) sidenavBottom: any;

  private extensionSubscription: any;

  constructor(private sidenavService: SidenavService, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.extensionSubscription = this.sidenavService.extensionsSubject.subscribe(extensions => {
      extensions.forEach((extension: Extension) => {
        let sidenavView = this.sidenavMiddle; // Default to middle section
        if (extension.target === "top") {
          sidenavView = this.sidenavTop;
        }
        if (extension.target === "bottom") {
          sidenavView = this.sidenavBottom;
        }

        // Dynamically render custom picker component
        let factory = this.resolver.resolveComponentFactory(extension.value as Type<MenuContribution>);
        let sidenavRef = sidenavView.createComponent(factory);
        sidenavRef.instance.config = extension.config;

        sidenavRef.instance.close.subscribe(() => {
          this.sidenavService.hide();
        });
      });
    });
  }

  ngOnDestroy() {
    this.extensionSubscription.unsubscribe();
  }

  hide() {
    this.sidenavService.hide();
  }
}
