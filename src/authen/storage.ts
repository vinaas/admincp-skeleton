import { inject } from 'aurelia-dependency-injection';
import {
  PLATFORM
} from 'aurelia-pal';
import { Config } from './config'
@inject(Config)
export class Storage {
  constructor(private config: Config) {

  }

  get(key: string): string {
    return PLATFORM.global[this.config.storage].getItem(key);
  }

  set(key: string, value: string) {
    PLATFORM.global[this.config.storage].setItem(key, value);
  }

  remove(key: string) {
    PLATFORM.global[this.config.storage].removeItem(key);
  }
}
