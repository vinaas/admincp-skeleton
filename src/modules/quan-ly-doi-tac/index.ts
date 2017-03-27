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