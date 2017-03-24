import { childViewer } from './../../helpers/child-viewer';
import { inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
@inlineView(childViewer)
export class QuanLyNhanVien {
    router: Router;
    heading = 'Quản lý nhân viên';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'danh-sach-nhan-vien'], name: 'danh-sach-nhan-vien', moduleId: './danh-sach-nhan-vien', nav: true, title: 'Danh sách nhân viên' }]);
        this.router = router;
    }
}