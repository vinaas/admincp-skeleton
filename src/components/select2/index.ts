import {
  bindable,
  bindingMode,
  inject,
  customAttribute
} from 'aurelia-framework';
import $ from "jquery";
import 'select2';
@inject(Element)
@customAttribute('select2')

export class Select2CustomAttribute {
  element: any;
  constructor(element) {
    this.element = element;
  }
  attached() {
    $(this.element).select2()
      .on('select2:select', (e) => {
        this.element.dispatchEvent(new Event('change'));
      })
  }
  detached() {
    $(this.element).select2('destroy');
  }


}
