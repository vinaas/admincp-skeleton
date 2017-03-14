import { logger } from './logger';
import { PLATFORM } from 'aurelia-pal';
import { STORAGE } from './../helpers/storage';
import { inject } from 'aurelia-framework';
import axios from 'axios';

@inject(STORAGE)
export class AuthenService {
  constructor(private storage: STORAGE) {

  }
  get isAuthenticated(): boolean {
    let token = this.storage.get(STORAGE.tokenKey);
    if (token)
      return true;
    return false;
  }
  get userInfo(): any {
    let userInfo = this.storage.get(STORAGE.userInfoKey);
    if (userInfo)
      return userInfo;
    return undefined;
  }
  logout() {
    this.storage.remove(STORAGE.tokenKey);
    this.storage.remove(STORAGE.userInfoKey);
    PLATFORM.location.reload();

  }
  login(userCredential: UserCredential): Promise<boolean> {
    return new Promise((resolve, reject) => {
      //call api later
      setTimeout(() => {
        this.storage.set(STORAGE.tokenKey, "token from res");
        this.storage.set(STORAGE.userInfoKey, { userName: userCredential.userName, image: "https://dummyimage.com/60x60/000/ff008c", roles: ['dev'] })
        this.setAxiosGlobal('token from res');
        resolve(true);
      }, 100);

    })
  }
  private setAxiosGlobal(token: string) {
    axios.defaults.headers = { 'Authorization': token };
    logger.info('Add axios header Authorization global');
  }
}
interface UserCredential {
  userName: string;
  passWord: string;
}
