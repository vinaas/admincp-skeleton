export class NhanVien{
    public MaNv : number;
    HoTen :String;
    ChucVu:String;
    Email:String;
    constructor(nhanVien?:any) {
        if(nhanVien){
            this.HoTen = nhanVien.HoTen;
            this.ChucVu = nhanVien.ChucVu;
            this.Email = nhanVien.Email;
        }
    }
}

// define validation model
import {ValidationRules} from 'aurelia-validation';
ValidationRules  
  .ensure( (x:NhanVien)=>x.HoTen).required()
  .ensure(x=>x.ChucVu).required()
  .ensure(x=>x.Email).required().email()
  .on(NhanVien);
