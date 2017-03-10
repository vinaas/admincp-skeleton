import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { NhanVien } from './../models/nhan-vien';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
@inject(DialogController, ValidationControllerFactory)

export class SaveNhanVien {
  validationcontroller: ValidationController;
  constructor(private dialogcontroller: DialogController, private controllerFactory) {
    this.validationcontroller = controllerFactory.createForCurrentScope();
    this.validationcontroller.addRenderer(new BootstrapFormRenderer());
  }
  get getTieuDe() {
    switch (this.nhanVienDto.MaNv) {
      case 0:
        return "Thêm mới nhân viên";

      default:
        return "Cập nhật nhân viên";
    }
  }
  nhanVienDto: NhanVien;
  activate(dto: NhanVien) {
    console.log('dto', dto);
    this.nhanVienDto = dto;
  }
  save() {
    this.validationcontroller.validate().then((result) => {
      if (result.valid) {
        this.dialogcontroller.ok(this.nhanVienDto);
      }
    })

  }

}
