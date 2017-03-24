import { DoiTac } from './../models/doi-tac';
import { QuanLyDoiTacServiceInterface } from './QuanLyDoiTacServiceInterface';

import * as firebase from 'firebase';
import * as _ from 'lodash';

export class QuanLyDoiTacServicePrototype implements QuanLyDoiTacServiceInterface {
  private db = firebase.database();
  constructor() {
  }

  GetDoiTac(Id: number): Promise<DoiTac> {
    return new Promise((resolve, reject) => {
      let DoiTacs: DoiTac[];
      this.db.ref('/partner/' + Id).once('value').then(function (snapshot) {
        var DoiTac = snapshot.val();
        resolve(new DoiTac(DoiTac));
      })
        .catch(err => reject(err));
    }
    )
  }
  GetDoiTacs(): Promise<DoiTac[]> {
    return new Promise((resolve, reject) => {
      let DoiTacs: DoiTac[] = [];
      this.db.ref('/partner').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          let doiTac = new DoiTac(_.assignIn({ Id: childKey }, childData));
          DoiTacs.push(doiTac);
          resolve(DoiTacs);
        });
      }, err => reject(err));
    })
  }
  PostDoiTac(doiTac: DoiTac): Promise<DoiTac> {

    return new Promise((resolve, reject) => {
      this.GetDoiTacs().then(res => {
        let maxMaDoiTac: number = _.maxBy(res, function (o) { return o['Id']; }).Id;
        doiTac.Id = +maxMaDoiTac + 1;
        this.db.ref('/partner/' + doiTac.Id).set(doiTac, (error?) => {
          if (error) {
            reject(new Error('firebase errors'));
          }
        }).then((res) => {
          resolve(res);
        })
      })

    })
  }
  PutDoiTac(doiTac: DoiTac): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.ref('/partner/' + doiTac.Id).set(doiTac, (error?) => {
        if (error) {
          reject(new Error('firebase errors'));
        }
      }).then((res) => {
        resolve(res);
      })
    })
  }
  DeleteDoiTac(Id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let doiTacBiXoa = this.db.ref('/partner/' + Id);
      doiTacBiXoa.remove().then(res => {
        resolve(res)
      })
        .catch(err => {
          reject(err)
        });
    })
  }
  DeleteDoiTacs(Ids: number[]): Promise<boolean> {
    let tasks: Promise<boolean>[];
    tasks = Ids.map(x => this.DeleteDoiTac(x));
    return new Promise((resolve, reject) => {
      Promise.all(tasks).then(values => {
        let result = values.reduce((previusVal, currnetVal) => previusVal && currnetVal);
        resolve(result);
      })
        .catch(err => reject(err))
    })

  }
}
