import { DoiTac } from './../models/doi-tac';
import { logger } from './../logger';
import { BootstrapFormRenderer } from './../../../helpers/bootstrap-form-renderer';
import { inject } from 'aurelia-framework';
import { DialogController } from "aurelia-dialog";
import { ValidationControllerFactory, ValidationController } from "aurelia-validation";
@inject(DialogController, ValidationControllerFactory)

export class SaveDoiTac {
    validationcontroller: ValidationController;

    doiTacDto: DoiTac;
    constructor(private dialogcontroller: DialogController, private controllerFactory) {
        this.validationcontroller = controllerFactory.createForCurrentScope();
        this.validationcontroller.addRenderer(new BootstrapFormRenderer());
    }

    get getTieuDe() {
        switch (this.doiTacDto.id) {
            case 0:
                return "Thêm mới";

            default:
                return "Cập nhật";
        }
    }
    activate(dto: DoiTac) {
        logger.info('dto', dto);
        this.doiTacDto = dto;
    }
    save() {
        this.validationcontroller.validate().then((result) => {
            if (result.valid) {
                this.dialogcontroller.ok(this.doiTacDto);
            }
        })

    }

}
