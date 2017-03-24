import { childView } from './../../helpers/child-view';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
import { inlineView } from "aurelia-templating";
@inlineView(childView)
export class QuanLyDoiTac {
    router: Router;
    heading = 'Quản lý đổi tác';
    configureRouter(config: RouterConfiguration, router: Router) {
        config.map([
            { route: ['', 'danh-sach-doi-tac'], name: 'danh-sach-doi-tac', moduleId: './danh-sach-doi-tac', nav: true, title: 'Danh sách đổi tác' }]);
        this.router = router;
    }
}