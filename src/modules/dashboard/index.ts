import { inject } from 'aurelia-dependency-injection';
import { PLATFORM } from 'aurelia-pal';
export class DashBoard {
    myselection = "AK";
    /**
     *
     */

    myvl = 2;
    color = 'green';
    constructor() {
        this.myvl = 2;
    }
    attached() {
    }
    bind(ct) {
        console.log('parent content', ct);
    }

}
