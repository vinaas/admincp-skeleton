import { STORAGE } from './helpers/storage';
import { Aurelia, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
@inject(Aurelia, Router, STORAGE)

export class Login {
  constructor(private aurelia: Aurelia, private router: Router, private storage: STORAGE) {

  };

  heading = 'Login';

  userName = '';
  passWord = '';
  login() {
    // todo check authen
    if (this.passWord.length == 4) {
      this.storage.set(STORAGE.tokenKey, "token from res");
      this.router.navigate('/');
      this.aurelia.setRoot('app')
        .then(() => {
          this.router.navigate('/');
        });;
    }


  }
}
