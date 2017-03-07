import { QuanLyNhanVienServiceInterface } from './QuanLyNhanVienServiceInterface';
import { NhanVien } from "../models/nhan-vien";
import * as firebase from 'firebase';
import * as _ from 'lodash';

export class QuanLyNhanVienServicePrototype implements QuanLyNhanVienServiceInterface {
  private db = firebase.database();
  constructor() {
  }

  GetNhanVien(maNv: number): Promise<NhanVien> {
    return new Promise((resolve, reject) => {
      this.db.ref('/users/' + maNv).once('value').then(function (snapshot) {
        var nhanVien = snapshot.val();
        resolve(new NhanVien(nhanVien));
      }, err => reject(err));
    })
  }
  GetNhanViens(): Promise<NhanVien[]> {
    return new Promise((resolve, reject) => {
      this.db.ref('/users').once('value').then(function (snapshot) {
        var nhanViens = snapshot.val();
        console.log(`nhan viens`, nhanViens);
        resolve(_.values(nhanViens));
      }, err => reject(err));
    })
  }
  PostNhanVien(nhanVien: NhanVien): Promise<NhanVien> {
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
