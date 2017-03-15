import { AuthenService } from './authen/authenService';
import swal from 'sweetalert';
// import { STORAGE } from './helpers/storage';
import { Aurelia, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
@inject(Aurelia, Router, AuthenService)

export class Login {
  constructor(private aurelia: Aurelia, private router: Router, private authSrv: AuthenService) {

  };

  heading = 'Login';

  userName = '';
  passWord = '';
  login() {
    // todo check authen

    if (this.passWord.length == 4) {
      swal({ title: 'Đăng nhập', text: 'Đăng nhập thành công', type: 'success', timer: 1000, showConfirmButton: false });
      this.authSrv.login({ userName: 'tungpt', passWord: 'passs' }).then(result => {
        this.router.navigate('/');
        this.aurelia.setRoot('app')
          .then(() => {
            this.router.navigate('/');
          });
      })
    }
    else {
      swal({ title: "Lỗi", text: "Nhập mật khẩu 4 kí tự để đăng nhập", type: "error", timer: 3000, showConfirmButton: false })
    }
  }
}
