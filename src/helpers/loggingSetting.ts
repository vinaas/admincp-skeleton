import { LogManager } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

var settingLevel = PLATFORM.global["localStorage"].getItem("logLevel");
if (!settingLevel) {
  PLATFORM.global["localStorage"].setItem("logLevel", 0);
}
LogManager.setLevel(+settingLevel);
