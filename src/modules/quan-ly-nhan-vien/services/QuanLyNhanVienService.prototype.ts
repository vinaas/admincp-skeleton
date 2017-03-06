import { IQuanLyNhanVienService } from "./IQuanLyNhanVienService";
import { NhanVien } from "../models/nhan-vien";
import * as firebase from 'firebase';
import * as _ from 'lodash';

export class QuanLyNhanVienServicePrototype implements IQuanLyNhanVienService {
  private _db = firebase.database();
  constructor() {
  }

  GetNhanVien(maNv: number): Promise<NhanVien> {
    return new Promise((resolve, reject) => {
      this._db.ref('/users/' + maNv).once('value').then(function (snapshot) {
        var nhanVien = snapshot.val();
        resolve(new NhanVien(nhanVien));
      });
      reject(new Error('firebase errors'));
    })

  }
  GetNhanViens(): Promise<NhanVien[]> {
    return new Promise((resolve, reject) => {
      this._db.ref('/users').once('value').then(function (snapshot) {
        var nhanViens = snapshot.val();
        console.log(`nhan viens`, nhanViens);
        resolve(_.values(nhanViens));
      });
      // reject(new Error('firebase errors'));
    })
  }
  PostNhanVien(nhanVien: NhanVien): Promise<NhanVien> {
    return new Promise((resolve, reject) => {
      this._db.ref('/users/' + nhanVien.MaNv).set(nhanVien, (error?) => {
        if (error) {
          reject(new Error('firebase errors'));

        }
      }).then((res) => {
        resolve(res);
      })


    })
  }
  PutNhanVien(nhanVien: NhanVien): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  DeleteNhanVien(maNv: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }


}
