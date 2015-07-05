import {Component, View, NgFor as For, NgIf as If} from 'angular2/angular2';
import {XkeSlotModel} from 'slot-store';

@Component({
    selector: 'xke-slot',
    properties: ['model']
})
@View({
    templateUrl: 'slot.html',
    directives: [For, If]
})
export class XkeSlot {
    status:boolean = false;
    error:string;
    model:XkeSlotModel;

    rsvp() {
        this.model.rsvp()
            .then(json => this.status = true)
            .catch(error => this.error = error);
    }
}
