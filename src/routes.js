import {ComponentAnnotation as Component, ViewAnnotation as View} from 'angular2/angular2';

@Component({
    selector: 'route1'
})
@View({
    template: `Page 1`
})
export class Route1 {

}

@Component({
    selector: 'route2'
})
@View({
    template: `Page 2`
})
export class Route2 {

}