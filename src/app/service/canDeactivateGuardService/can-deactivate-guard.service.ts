import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService {

  canDeactivate(component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot) {
    if (currentState.url.includes('/game/start') && nextState.url.includes('/game/question')) {
      return true;
    }

    if (currentState.url.includes('/game/question') && (nextState.url.includes('/game/question') || nextState.url.includes('/game/finish'))) {
      return true;
    }

    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
