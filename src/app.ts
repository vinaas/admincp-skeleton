import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' },
      { route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' },
      { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      { route: 'select2-example', name: 'select2-example', moduleId: './select2-ex', nav: true, title: 'Select2 example' },
      { route: 'sweetalert-example', name: 'sweetalert-example', moduleId: './swal', nav: true, title: 'sweetalert example' },
      { route: 'sweetalert-exampleư23', name: 'sweetalert-example22', moduleId: './swal', nav: true, title: 'EasyWeb Components' }
    ]);

    this.router = router
  }
}
