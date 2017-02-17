
import 'select2';
import $ from 'jquery';
import './select2-ex.css';
export class Select2Example{
    
    
    attached(){
        // chạy file js tương ứng html định nghĩa ở template tướng ứng
          $(".js-example-basic-single").select2();

    }
}
