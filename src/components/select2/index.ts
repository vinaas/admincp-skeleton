import { bindable, inject, customAttribute } from 'aurelia-framework';
import $ from 'jquery';
import 'select2';
@inject(Element)
@customAttribute('select2')

export class Select2CustomAttribute {
    @bindable otherProp='some data';
    element: any;
    value;
    constructor(element) {
        this.element = element;

    }
    attached() {
        $(this.element).select2()
            .on('select2:select', () => this.element.dispatchEvent(new Event('change')));
        $(this.element).select2('val', `${this.value}`);

    }

    bind(ct) {
        console.log(ct);
    }
    detached() {
        $(this.element).select2('destroy');
    }
    valueChanged(n, o) {
        console.log('value', this.value);
        console.log('value2', this.element.value);
    }

}