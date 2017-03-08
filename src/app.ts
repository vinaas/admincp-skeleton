import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'dashboard'], name: 'dashboard', moduleId: 'modules/dashboard/index', nav: true, title: 'dashboard' },
      { route: 'quan-ly-nhan-vien', name: 'quan-ly-nhan-vien', moduleId: 'modules/quan-ly-nhan-vien/index', nav: true, title: 'Quản lý nhân viên' },
    ]);

    this.router = router;

  }
  attached() {
    var script = document.createElement("script");
    script.src = "pages/js/scripts.js";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
