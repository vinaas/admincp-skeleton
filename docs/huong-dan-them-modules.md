# Hướng dẫn thêm một module mới

### Thêm 1 module
1. Tạo 1 folder `ten-module` trong thư mục `/src/modules/`
1. Tạo các thành phần giao diện( cặp view , view model) cho module , tham khảo [Creating Components](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/creating-components/1)
  - view `index.html`

    ```html    
      <template>
      <section class="au-animate">
        <h2>${heading}</h2>
        <div>
          <div class="col-md-2">
            <ul class="well nav nav-pills nav-stacked">
              <li repeat.for="row of router.navigation" class="${row.isActive ? 'active' : ''}">
                <a href.bind="row.href">${row.title}</a>
              </li>
            </ul>
          </div>
          <div class="col-md-10" style="padding: 0">
            <router-view></router-view>
          </div>
        </div>
      </section>
    </template>
    ```
  - viewmodel `index.html`

    ```javascript
      import { inject } from 'aurelia-dependency-injection';
      import { Router, RouterConfiguration } from 'aurelia-router';
      export class QuanLyNhanVien {
      router: Router;
      heading = 'Quản lý nhân viên';
      configureRouter(config: RouterConfiguration, router: Router) {
          config.map([
              { route: ['', 'danh-sach-nhan-vien'], name: 'danh-sach-nhan-vien', moduleId: './danh-sach-nhan-vien', nav: true, title: 'Danh sách nhân viên' }]);
          this.router = router;
        }
      }
    ```
1. Định nghĩa các model liên quan đến module và [validation](http://aurelia.io/hub.html#/doc/article/aurelia/validation/latest/validation-basics) rules trong thư mục `src/modules/ten-module/models`
  - nhan-vien.ts
  ```javascript
        export class NhanVien {
          public MaNv: number;
          HoTen: String;
          ChucVu: String;
          Email: String;
          constructor(nhanVien: any = { MaNv: 0 }) {
              this.MaNv = nhanVien.MaNv;
              this.ChucVu = nhanVien.ChucVu;
              this.Email = nhanVien.Email;
              this.HoTen = nhanVien.HoTen;

          }
      }

      // define validation model
      import { ValidationRules } from 'aurelia-validation';
      ValidationRules
          .ensure((x: NhanVien) => x.HoTen).required()
          .ensure(x => x.ChucVu).required()
          .ensure(x => x.Email).required().email()
          .on(NhanVien);

  ```
1. Định nghĩa các CRUD services cho module trong thư mục `src/modules/ten-module/services`
  - IQuanLyNhanVienService.ts
  ```javascript
      import { NhanVien } from "../models/nhan-vien";
      export interface IQuanLyNhanVienService {
      GetNhanVien(maNv: number): Promise<NhanVien>;
      GetNhanViens(): Promise<Array<NhanVien>>;
      PostNhanVien(nhanVien: NhanVien): Promise<NhanVien>;
      PutNhanVien(nhanVien: NhanVien): Promise<boolean>;
      DeleteNhanVien(maNv: number): Promise<boolean>;
      }
  ```
  - QuanLyNhanVienService.prototype.ts  //fake data, using firebase implement CRUD
  - QuanLyNhanVienService.ts // implement restful apis
  




