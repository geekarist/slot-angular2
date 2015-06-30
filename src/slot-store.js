import {Http} from 'angular2/http';

export class XkeSlotStore {
    slots:Array = [];

    constructor(http:Http) {
        http.request('slots.json')
            .map(res => res.json())
            .subscribe(slots => {
                this.slots = slots.map(s => new XkeSlotModel(s))
            });
    }
}

export class XkeSlotModel {

    name:string;
    watch:boolean = false;
    speakers:Array<string>;
    attendees:int = 0;

    constructor({title, speakers, attendees = 0}) {
        this.name = title;
        this.speakers = speakers;
        this.attendees = attendees;
    }

    rsvp() {
        return fetch('/rsvp/' + this.name)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    this.attendees++;
                    return response;
                }
                throw new Error(response.statusText)
            })
            .then(response => response.json());
    }
}
