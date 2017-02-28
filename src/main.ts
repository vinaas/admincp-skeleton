import {Aurelia} from 'aurelia-framework';
import {LicenseManager} from "ag-grid-enterprise/main";
// we want font-awesome to load as soon as possible to show the fa-spinner
// import '../styles/styles.css';
// import 'font-awesome/css/font-awesome.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap';
import "select2/dist/css/select2.min.css";
import "sweetalert";
import "sweetalert/dist/sweetalert.css";
import config from "./configs/authen-config";
// comment out if you don't want a Promise polyfill (remove also from webpack.config.js)
import * as Bluebird from 'bluebird';

Bluebird.config({ warnings: false });
export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('ag-grid-aurelia')
    .feature('resources')
    // .plugin('aurelia-auth', (baseConfig)=>{   //the name of plugin becomes 'paulvanbladel/aurelia-auth'
    // 	baseConfig.configure(config);
    // })

    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')
  // LicenseManager.setLicenseKey('ag-Grid_EvaluationLicense_NotForProduction_100Devs24_April_2017__MTQ5Mjk4ODQwMDAwMA==45c3450a171d4f17e8facddb3f1162e2');
  await aurelia.start();
  
  aurelia.setRoot('login');

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
