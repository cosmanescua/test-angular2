import {EventEmitter, Injectable,Output} from "@angular/core";

@Injectable()
export class GlobalEventsManager {
    //emit this event when the user logges in
    public showNavBar: EventEmitter<any> = new EventEmitter();
    constructor() {
    }
}
