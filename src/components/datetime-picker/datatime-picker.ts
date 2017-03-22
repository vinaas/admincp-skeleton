import { getLogger } from 'aurelia-logging';
import { customAttribute, bindable, bindingMode, inject } from 'aurelia-framework';
import * as $ from 'jquery'
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import 'eonasdan-bootstrap-datetimepicker';
import * as moment from 'moment';
@inject(Element)
@customAttribute('datetime-picker')
export class DateTimePicker {
  @bindable({ defaultBindingMode: bindingMode.twoWay }) valuedate;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) formatdate;
  element: any;
  constructor(element) {
    this.element = element;
    this.valuedate = new Date();
    this.formatdate = "YYYY-MM-DD HH:mm:ss";
  }

  attached() {
    console.log(this.element.value);
    $(this.element).datetimepicker({
      format: this.formatdate,
      widgetPositioning: {
        vertical: 'bottom'
      }
    }
    ).on("dp.change", () => {
      this.element.dispatchEvent(new Event('change'));
    });
  }
  detached() {
    ($(this.element)).datetimepicker('destroy')
      .off('dp.change');
  }

}


