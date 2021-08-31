import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { EventEntity } from '../data-types/event';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventGuardService implements CanActivate {

  constructor(public router: Router, public eventService: EventService) { }

  canActivate(router: ActivatedRouteSnapshot): Observable<boolean> {
    const eventId = router.params.eventId;
    const token: any = jwt_decode(sessionStorage.getItem('token') || '');
    
    return this.eventService.getEventsByUserIdAndFilter(token.email, "All Events").pipe(
        map(
            (data: EventEntity[]) => {
            for(const event of data) {
                if(event.id === eventId) {
                    return true;
                }
            }
            this.router.navigate(['/dashboard']);
            return false;
        })
        
    );
  }
}
