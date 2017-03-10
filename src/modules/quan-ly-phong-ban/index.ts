import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
export class QuanLyNhanVien {
    router: Router;
    heading = 'Quản lý phòng ban';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'ds-phong-ban'], name: 'ds-phong-ban', moduleId: './ds-phong-ban', nav: true, title: 'Danh sách phòng ban' }]);
        this.router = router;
    }
}