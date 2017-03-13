import { PLATFORM } from 'aurelia-pal';
import { STORAGE } from './../helpers/storage';
import { inject } from 'aurelia-framework';
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
        let userInfo = this.storage.get(STORAGE.userInfoKey)
        if (userInfo)
            return userInfo;
        return undefined;
    }
    logout() {
        this.storage.remove(STORAGE.tokenKey);
        this.storage.remove(STORAGE.userInfoKey);
        PLATFORM.location.reload();

    }
}