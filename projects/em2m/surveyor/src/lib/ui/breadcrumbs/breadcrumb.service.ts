import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private updateSubject = new BehaviorSubject<boolean>(true);

  constructor() {
  }

  onRefresh(): Observable<boolean> {
    return this.updateSubject.asObservable();
  }

  refresh() {
    this.updateSubject.next(true);
  }
}
