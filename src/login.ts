import swal from 'sweetalert';
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
      swal({ title: 'Đăng nhập', text: 'Đăng nhập thành công', type: 'success', timer: 1000, showConfirmButton: false });
      this.storage.set(STORAGE.tokenKey, "token from res");
      this.storage.set(STORAGE.userInfoKey, { userName: "TungPT", image: "https://dummyimage.com/60x60/000/ff008c", roles: ['dev'] })
      this.router.navigate('/');
      this.aurelia.setRoot('app')
        .then(() => {
          this.router.navigate('/');
        });
    }


  }
}
