export class DoiTac {
    Id: number;
    Ten: String;
    DiaChi: String;
    constructor(doiTac: any = { Id: 0 }) {
        this.Id = doiTac.Id;
        this.Ten = doiTac.Ten;
    }
}

// define validation model
import { ValidationRules } from 'aurelia-validation';
ValidationRules
    .ensure((x: DoiTac) => x.Ten).required()
    .ensure(x => x.DiaChi).required()
    .on(DoiTac);
