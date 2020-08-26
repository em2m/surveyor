import {
  Component, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit, OnChanges, OnDestroy
} from '@angular/core';
import {ExtensionService} from '../../core/extension/extension.service';

@Component({
  selector: 'surveyor-region',
  template: `<div [ngClass]="{'flex-horizontal': type == 'horizontal'}" id="region-{{regionId}}"><div #regionTarget></div></div>`,
})
export class RegionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() regionId: string;
  @Input() type?: 'vertical' | 'horizontal' = 'vertical';
  @ViewChild('regionTarget', {read: ViewContainerRef, static: true}) regionTarget: any;
  private regionComponents: Array<any> = [];

  constructor(private resolver: ComponentFactoryResolver,
              private extensionService: ExtensionService) {
  }

  ngOnInit() {
    this.loadRegion();
  }

  ngOnChanges() {
    this.loadRegion();
  }

  ngOnDestroy() {
    this.destroyRegion();
  }

  private loadRegion() {
    this.destroyRegion();

    const extensions = this.extensionService.getExtensionsForTarget(this.regionId) || [];
    extensions.forEach(extension => {
      const factory = this.resolver.resolveComponentFactory(extension.value);

      // Dynamically render the new region component
      const regionComponentRef = this.regionTarget.createComponent(factory);

      // Update the component with each of the configuration attributes from the extension
      for (const configKey in extension.config) {
        if (extension.config.hasOwnProperty(configKey)) {
          regionComponentRef.instance[configKey] = extension.config[configKey];
        }
      }

      this.regionComponents.push(regionComponentRef);
    });
  }

  private destroyRegion() {
    this.regionComponents.forEach(regionComponent => {
      if (regionComponent) {
        regionComponent.destroy();
      }
    });
    this.regionComponents = [];
  }
}
