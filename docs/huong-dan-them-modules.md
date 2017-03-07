# Hướng dẫn thêm một module mới

### Thêm 1 module
- Tạo 1 folder `ten-module` trong thư mục `/src/modules/`
- Tạo 1 cặp view , view model: `index.html` và `index.ts` (định nghĩa child_route các thành phần trong module)
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


