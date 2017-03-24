import { inlineView } from 'aurelia-templating';
import { childView } from './../../helpers/child-view';
import { inject } from 'aurelia-dependency-injection';
import { Router, RouterConfiguration } from 'aurelia-router';
@inlineView(childView)
export class QuanLyPhongBan {
  router: Router;
  heading = 'Quản lý phòng ban';
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      { route: ['', 'ds-phong-ban'], name: 'ds-phong-ban', moduleId: './ds-phong-ban', nav: true, title: 'Danh sách phòng ban' },
      { route: 'other-module', name: 'other-module', moduleId: './other-module', nav: true, title: 'other menu' },
    ]);
    this.router = router;
    console.log("router", this.router);
  }
}
