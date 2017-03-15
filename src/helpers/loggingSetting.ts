import { LogManager } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

var settinLogLevel = PLATFORM.global["localStorage"].getItem("logLevel");
if (!settinLogLevel) {
  if (process.env.ENV === 'development') PLATFORM.global["localStorage"].setItem("logLevel", 4)
  else PLATFORM.global["localStorage"].setItem("logLevel", 0); //pproduction ENV
}
LogManager.setLevel(+settinLogLevel);
