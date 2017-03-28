# Hướng dẫn thêm một module mới

### Thêm 1 module "Quản lý đối tác"

#### Cấu trúc thư mục:
```html
/src
  |__modules
  |  |__quan-ly-doi-tac
  |     |__dialogs
  |     |  |__luu-nhan-vien.html
  |     |  |__luu-nhan-vien.ts
  |     |__models
  |     |  |__doi-tac.ts
  |     |__services
  |     |  |__quan-ly-doi-tac-service-interface.ts
  |     |  |__quan-ly-doi-tac-service-prototype.ts
  |     |  |__quan-ly-doi-tac-service-production.ts
  |     |__danh-sach-doi-tac.html
  |     |__danh-sach-doi-tac.ts
  |     |__ index.ts // định nghĩa child router (module level)
  |     |__logger.ts
  |__app.ts // định nghĩa root router(app level)

  ```
#### Các bước

1. Tạo 1 folder `quan-ly-doi-tac` trong thư mục `/src/modules/`
2. Tạo router, logger cho module `quan-ly-doi-tac` [commit tại đây](https://github.com/easywebhub/admincp-skeleton/commit/433b0f0264b908cf95cc55f4cd85a94698a3b3f7)
- quan-ly-doi-tac/index.ts (router)
```javascript
import { childViewer } from './../../helpers/child-viewer';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { inlineView } from "aurelia-templating";
@inlineView(childViewer)
export class QuanLyDoiTac {
    router: Router;
    heading = 'Quản lý đổi tác';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'danh-sach-doi-tac'], name: 'danh-sach-doi-tac', moduleId: './danh-sach-doi-tac', nav: true, title: 'Danh sách đổi tác' }]);
        this.router = router;
    }
}
```
- quan-ly-doi-tac/logger.ts (logger)
```javascript
import { getLogger } from 'aurelia-logging';
export const logger = getLogger('quan-ly-doi-tac');
```
3. Định nghĩa models, validation rules (tham khảo [aurelia-validation](https://github.com/aurelia/validation))  cho model tương ứng nếu có [commit tại đây](https://github.com/easywebhub/admincp-skeleton/commit/29d968a5209522585a5f7154694c94264014e3be):
- modules/doi-tac.ts
```javascript
export class DoiTac {
    Id: number;
    Ten: String;
    DiaChi: String;
    constructor(doiTac: any = { Id: 0 }) {
        this.Id = doiTac.Id;
        this.Ten = doiTac.Ten;
        this.DiaChi = doiTac.DiaChi;    
    }
}

// define validation
import { ValidationRules } from 'aurelia-validation';
ValidationRules
    .ensure((x: DoiTac) => x.Ten).required()
    .ensure(x => x.DiaChi).required()
    .on(DoiTac);
```
4. Định nghĩa các services (remote data) cho modules [commit tại đây](https://github.com/easywebhub/admincp-skeleton/commit/06351d3e8f28f8d5b69b72e44dd36dccae285ced)
- quan-ly-doi-tac-service-interface.ts
```javascript
import { DoiTac } from "../models/doi-tac";
export interface QuanLyDoiTacServiceInterface {
  GetDoiTac(maNv: number): Promise<DoiTac>;
  GetDoiTacs(): Promise<Array<DoiTac>>;
  PostDoiTac(DoiTac: DoiTac): Promise<DoiTac>;
  PutDoiTac(DoiTac: DoiTac): Promise<boolean>;
  DeleteDoiTac(maNv: number): Promise<boolean>;
  DeleteDoiTacs(maNvs: number[]): Promise<boolean>;
  GetDoiTacsByFilter(filter: any): Promise<Array<DoiTac>>;
}
```
- [quan-ly-doi-tac-service-prototype.ts](https://github.com/easywebhub/admincp-skeleton/blob/master/src/modules/quan-ly-doi-tac/services/QuanLyDoiTacServicePrototype.ts)
- [quan-ly-doi-tac-service-production.ts](https://github.com/easywebhub/admincp-skeleton/blob/master/src/modules/quan-ly-doi-tac/services/QuanLyDoiTacServiceProduction.ts)
5. Thêm dialogs (tham khảo [aurelia-dialog](https://github.com/aurelia/dialog)) [commit tại đây](https://github.com/easywebhub/admincp-skeleton/commit/6d60a11e60d3596d26da7d56b3a78ba52d5e21b2)
- dialogs/luu-doi-tac.html
```html
<template>
  <style>
    ai-dialog-overlay.active {
      background-color: black;
      opacity: .5;
    }
  </style>
  <ai-dialog>
    <ai-dialog-header>
      <h2>${getTieuDe}</h2>
    </ai-dialog-header>
    <ai-dialog-body>

      <form submit.delegate="save()">
        <div class="form-group">
          <label>Tên</label>
          <input type="text" attach-focus="true" class="form-control" value.bind="doiTacDto.Ten & validateOnChange">
        </div>
        <div class="form-group">
          <label>Địa chỉ</label>
          <input type="text" class="form-control" value.bind="doiTacDto.DiaChi & validate">
        </div>

        <button class="btn btn-primary" type="submit">Lưu</button>
        <button class="btn btn-warning" click.trigger="dialogcontroller.cancel()">Hủy</button>
      </form>
    </ai-dialog-body>
  </ai-dialog>
</template>
```
- dialogs/luu-doi-tac.ts
```javascript
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
        switch (this.doiTacDto.Id) {
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
```
6. Thêm component ([tham khảo reating Components](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/creating-components/1)) danh-sach-nhan-vien [commit tại đây](https://github.com/easywebhub/admincp-skeleton/commit/f40d0abd74b6a80085ee0e3caece2a47102cd51b) 
- danh-sach-doi-tac.html
```html
<template>
  <div class="row">
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <input type="button" class="btn btn-primary" value="Thêm mới" click.delegate="themMoiDoiTac()">
    </div>
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
      <div class="btn-group">
        <button disabled.bind="selectedItems.length===0" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
    Đã chọn (${selectedItems.length}) <span class="caret"></span>
  </button>
        <ul class="dropdown-menu">
          <li click.delegate="deleteSelected()"><a href="javascript:void(0)">Xóa</a></li>
          <li click.delegate="deselectAll()"><a href="javascript:void(0)">Bỏ chọn</a></li>
        </ul>
      </div>
    </div>
  </div>
  <hr>
  <form class="form-inline" submit.delegate="search()">
    <div class="form-group">
      <label for="Ten">Tên</label>
      <input type="Ten" class="form-control" id="Ten" value.bind="filter.Ten">
    </div>
    <div class="form-group">
      <label for="diaChi">Địa Chỉ</label>
      <input type="text" class="form-control" id="diaChi" value.bind="filter.DiaChi">
    </div>
    <button type="submit" class="btn btn-primary">Tìm kiếm</button>
  </form>
  <hr>
  <div style="width: 100%; height: 350px;">
    <ag-grid-aurelia #agGrid class="ag-fresh" grid-options.bind="gridOptions" column-defs.bind="columnDefs" grid-ready.call="onReady()"
      row-clicked.call="onRowClicked($event)" row-double-clicked.call="onRowDoubleClicked($event)" row-selected.call="onRowSelected($event)">

    </ag-grid-aurelia>
  </div>
</template>
```
- [danh-sach-doi-tac.ts](https://github.com/easywebhub/admincp-skeleton/blob/master/src/modules/quan-ly-doi-tac/danh-sach-doi-tac.ts)
  - **Load danh sách đối tác lên ag-grid**
      - lấy danh sách đối tác từ service rồi gán vào property `listItem`
     ```javascript
     activate(){
       this.quanLyDoiTacSrv.GetDoiTacs().then((res) => {
              this.listItem = res;
          })
       }
     ```
     - apply lên ag-grid bằng cách gọi method `loadDatasource()`
   - **Thêm mới đối tác**
        - Gán property `selectedItem = new DoiTac()`
        ```javascript
        themMoiDoiTac() {
         this.selectedItem = new DoiTac();
        this.dialogService.open({ viewModel: SaveDoiTac, model: this.selectedItem }).then...
        }
        ```
    - **Cập nhật đối tác**
        - khi chọn 1 đối tác để cập nhật,  property selectedItem lúc này đã có giá trị, là đối tượng đối tác đang được chọn
       ```javascript
         public onActionEditClick() {
            this.dialogService.open({ viewModel: SaveDoiTac, model: this.selectedItem }).then...
            }
       ```
       
     - **Filter**
       - bind filter lên view
        ```html
          <form class="form-inline" submit.delegate="search()">
            <div class="form-group">
              <label for="Ten">Tên</label>
              <input type="Ten" class="form-control" id="Ten" value.bind="filter.Ten">
            </div>
            <div class="form-group">
              <label for="diaChi">Địa Chỉ</label>
              <input type="text" class="form-control" id="diaChi" value.bind="filter.DiaChi">
            </div>
            <button type="submit" class="btn btn-primary">Tìm kiếm</button>
          </form>
        ```
       - apply khi submit form filter

       ```javascript
          search() {
          this.quanLyDoiTacSrv.GetDoiTacsByFilter(this.filter)
              .then(data => { this.listItem = data })
              .catch(err => {
                  swal('Lỗi', err, 'error');
              })
          }
       ```
6. Định nghĩa module `Quản lý đối tác` trong root router
- src/app.ts, thêm một đối tượng route trong config.map

```javascript
 {
        route: 'quan-ly-doi-tac', name: 'quan-ly-doi-tac', moduleId: 'modules/quan-ly-doi-tac/index', nav: true, title: 'Quản lý đối tác',
        settings: { icon: 'pg-tables' }
      }
```
**END**
