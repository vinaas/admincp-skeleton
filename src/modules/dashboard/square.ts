import { inject } from 'aurelia-dependency-injection';
@inject(Element)
export class SquareCustomAttribute {

    value;
    constructor(private element) {
        this.element = element;
        this.element.style.width = this.element.style.height = '100px';
    }

    bind() {
        this.element.style.backgroundColor = this.value;
    }
    valueChanged(newValue, oldValue) {
        this.element.style.backgroundColor = newValue;
    }
}