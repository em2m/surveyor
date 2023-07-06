import {AfterViewInit, Component} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {SplashScreen} from '@capacitor/splash-screen';

@Component({
  templateUrl: './root.page.html'
})
export class CapacitorRootPage implements AfterViewInit{

  constructor() {}

  ngAfterViewInit(){
    if (Capacitor.isPluginAvailable('SplashScreen')) {
      SplashScreen.hide();
    }
  }
}
