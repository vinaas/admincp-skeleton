export class DoiTac {
    id: number;
    ten: String;
    diaChi: String;
    constructor(doiTac: any = { Id: 0 }) {
        this.id = doiTac.id;
        this.ten = doiTac.ten;
        this.diaChi = doiTac.diaChi;    
    }
}

// define validation model
import { ValidationRules } from 'aurelia-validation';
ValidationRules
    .ensure((x: DoiTac) => x.ten).required()
    .ensure(x => x.diaChi).required()
    .on(DoiTac);
