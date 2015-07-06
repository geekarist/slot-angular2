import {NgFor, ComponentAnnotation as Component, ViewAnnotation as View, Event, bootstrap} from 'angular2/angular2';
import {StoreService} from 'store-service';
import {XkeSlot} from 'xke-slot';

@Component({
    selector: 'xke-slots',
    appInjector: [StoreService]
})
@View({
    templateUrl: 'xke-slots.html',
    directives: [NgFor, XkeSlot]
})
export class XkeSlots {
    storeService: StoreService;

    constructor(storeService: StoreService) {
        this.storeService = storeService;
    }

    getSlots() {
        return this.storeService.getSlots()
    }

}