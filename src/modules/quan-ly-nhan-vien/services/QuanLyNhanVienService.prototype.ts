import { QuanLyNhanVienServiceInterface } from './QuanLyNhanVienServiceInterface';
import { NhanVien } from './../models/nhan-vien';
import * as firebase from 'firebase';
import * as _ from 'lodash';

export class QuanLyNhanVienServicePrototype implements QuanLyNhanVienServiceInterface {
  private db = firebase.database();
  constructor() {
  }

  GetNhanVien(maNv: number): Promise<NhanVien> {
    return new Promise((resolve, reject) => {
      let nhanViens: NhanVien[];
      this.db.ref('/users/' + maNv).once('value').then(function (snapshot) {
        var nhanVien = snapshot.val();
        resolve(new NhanVien(nhanVien));
      })
        .catch(err => reject(err));
    }
    )
  }
  GetNhanViens(): Promise<NhanVien[]> {
    return new Promise((resolve, reject) => {
      let nhanViens: NhanVien[] = [];
      this.db.ref('/users').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          let nhanVien = new NhanVien(_.assignIn({ MaNv: childKey }, childData));
          nhanViens.push(nhanVien);
          resolve(nhanViens);
        });
      }, err => reject(err));
    })
  }
  PostNhanVien(nhanVien: NhanVien): Promise<NhanVien> {

    return new Promise((resolve, reject) => {
      this.GetNhanViens().then(res => {
        let maxMaNhanVien = _.maxBy(res, function (o) { return o['MaNv']; }).MaNv;
        nhanVien.MaNv = maxMaNhanVien + 1;
        this.db.ref('/users/' + nhanVien.MaNv).set(nhanVien, (error?) => {
          if (error) {
            reject(new Error('firebase errors'));
          }
        }).then((res) => {
          resolve(res);
        })
      })

    })
  }
  PutNhanVien(nhanVien: NhanVien): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.ref('/users/' + nhanVien.MaNv).set(nhanVien, (error?) => {
        if (error) {
          reject(new Error('firebase errors'));
        }
      }).then((res) => {
        resolve(res);
      })
    })
  }
  DeleteNhanVien(maNv: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let nhanVienBiXoa = this.db.ref('/users/' + maNv);
      nhanVienBiXoa.remove().then(res => {
        resolve(res)
      })
        .catch(err => {
          reject(err)
        });
    })
  }
}
