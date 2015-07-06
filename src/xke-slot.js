import {NgFor, ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({selector: 'xke-slot', properties: ['model']})
@View({templateUrl: 'xke-slot.html', directives: [NgFor]})
export class XkeSlot {

}