import {ComponentAnnotation as Component, ViewAnnotation as View, Event, bootstrap} from 'angular2/angular2';
import {XkeSlots} from "xke-slots";

@Component({
    selector: 'xke-app'
})
@View({
    template: `<header>Hello, {{name}}</header><xke-slots></xke-slots>`,
    directives: [XkeSlots]
})
export class App {
    constructor() {
        this.name = 'xke';
    }
    doGreet() {
        alert('I am Greet');
    }
}

bootstrap(App);
