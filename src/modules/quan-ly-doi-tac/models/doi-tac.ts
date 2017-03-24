export class DoiTac {
    Id: number;
    Ten: String;
    DiaChi: String;
    constructor(doiTac: any = { Id: 0 }) {
        this.Id = doiTac.MaNv;
        this.Ten = doiTac.ChucVu;
        this.DiaChi = doiTac.DiaChi;
    }
}

// define validation model
import { ValidationRules } from 'aurelia-validation';
ValidationRules
    .ensure((x: DoiTac) => x.Ten).required()
    .ensure(x => x.DiaChi).required()
    .on(DoiTac);
