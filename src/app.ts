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
      { route: 'sweetalert-example', name: 'sweetalert-example', moduleId: './swal', nav: true, title: 'sweetalert examplenents' },
      { route: 'login', name: 'login', moduleId: './login', nav: true, title: 'login' },
      {
        route: 'rich-grid/:fromDocs?',
        name: 'rich-grid',
        nav: true,
        moduleId: 'components/rich-grid-example/rich-grid-example',
        title: 'Rich Grid with pure JavaScript',
        href:'#/rich-grid'
      },
      {
        route: 'richgrid-declarative/:fromDocs?',
        name: 'richgrid-declarative',
        nav: true,
        moduleId: 'components/rich-grid-declarative-example/rich-grid-declarative-example',
        title: 'Rich Grid with Declarative Markup',
        href:'#/richgrid-declarative'
      },
      {
        route: 'editor/:fromDocs?',
        name: 'editor',
        nav: true,
        moduleId: 'components/editor-example/editor-example',
        title: 'Editor Example',
        href:'#/editor'
      },
      {
        route: 'floating-row/:fromDocs?',
        name: 'floating-row',
        nav: true,
        moduleId: 'components/floating-row-example/floating-row-example',
        title: 'Floating Row Example',
        href:'#/floating-row'
      },
      {
        route: 'full-width/:fromDocs?',
        name: 'full-width',
        nav: true,
        moduleId: 'components/full-width-example/full-width-example',
        title: 'Full Width Example',
        href:'#/full-width'
      },
      {
        route: 'group-row/:fromDocs?',
        name: 'group-row',
        nav: true,
        moduleId: 'components/group-row-example/group-row-example',
        title: 'Group Row Example',
        href:'#/group-row'
      },
      {
        route: 'filter/:fromDocs?',
        name: 'filter',
        nav: true,
        moduleId: 'components/filter-example/filter-example',
        title: 'Filter Example',
        href:'#/filter'
      }
    ]);

    this.router = router
  }
}
