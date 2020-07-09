import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {Observable, fromEvent, BehaviorSubject} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

@Injectable({ providedIn: 'root' })
export class NetworkService {

  private connectionSubject: BehaviorSubject<boolean> = new BehaviorSubject(navigator.onLine);

  constructor(@Inject(PLATFORM_ID) platform) {
    if (isPlatformBrowser(platform)) {
      fromEvent(window, 'offline').subscribe(() => this.connectionSubject.next(false));
      fromEvent(window, 'online').subscribe(() => this.connectionSubject.next(true));
    }
  }

  monitor(): Observable<boolean> {
    return this.connectionSubject.asObservable();
  }

  isConnected(): boolean {
    return this.connectionSubject.value;
  }
}
