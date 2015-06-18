import {ComponentAnnotation as Component, ViewAnnotation as View, Event, bootstrap, bind} from 'angular2/angular2';
import {routerInjectables, RouterOutlet, RouterLink, RootRouter, Router, Pipeline, RouteConfig} from 'angular2/router';
import {XkeSlots} from 'slots';
import {XkeFilter} from 'filter';
import {Route1, Route2} from 'routes';

@Component({
    selector: 'xke-app'
})
@View({
    template: `
        <h1>{{title}}</h1>

        <ul>
            <li router-link="route1">Page 1</li>
            <li router-link="route2">Page 2</li>
        </ul>
        <router-outlet></router-outlet>

        <xke-filter (filter)="xkeslots.filter($event.value)"></xke-filter>
        <xke-slots #xkeslots></xke-slots>
    `,
    directives: [XkeSlots, XkeFilter, RouterOutlet, RouterLink]
})
@RouteConfig([
    {path: '#/', component: Route1},
    {path: '#/route1', component: Route1, as: 'route1'},
    {path: '#/route2', component: Route2, as: 'route2'}
])
export class App {
    title:string = 'x-vote';
}

bootstrap(App, [routerInjectables]);
