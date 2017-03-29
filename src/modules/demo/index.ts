
import * as moment from 'moment';
import * as $ from 'jquery';
import { PLATFORM } from "aurelia-pal";
export class demo {
  attached() {
    console.log('q',$)
     
     PLATFORM.global.$('#datepicker-range').datepicker();
  }
}
