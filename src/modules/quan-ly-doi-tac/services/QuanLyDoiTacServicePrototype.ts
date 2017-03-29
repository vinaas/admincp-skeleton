import axios from 'axios';
import { logger } from './../logger';
import { DoiTac } from './../models/doi-tac';
import { QuanLyDoiTacServiceInterface } from './QuanLyDoiTacServiceInterface';

import * as firebase from 'firebase';
import * as _ from 'lodash';

export class QuanLyDoiTacServicePrototype implements QuanLyDoiTacServiceInterface {
  getDoiTacsByFilter(filter: any): Promise<Array<DoiTac>> {
    return new Promise((resolve, reject) => {
      let doiTacs: DoiTac[] = [];
      axios.get('api/doi-tac-filter', { params: filter })
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
  }

  private db = firebase.database();
  constructor() {
  }

  getDoiTac(id: number): Promise<DoiTac> {
    return new Promise((resolve, reject) => {
      this.db.ref('/partner/' + id).once('value').then(function (snapshot) {
        var doiTac = snapshot.val();
        resolve(new DoiTac(doiTac));
      })
        .catch(err => reject(err));
    }
    )
  }
  getDoiTacs(): Promise<DoiTac[]> {
    return new Promise((resolve, reject) => {
      let doiTacs: DoiTac[] = [];
      this.db.ref('/partner').once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          let doiTac = new DoiTac(_.assignIn({ id: childKey }, childData));
          doiTacs.push(doiTac);
          resolve(doiTacs);
        });
      }, err => reject(err));
    })
  }
  postDoiTac(doiTac: DoiTac): Promise<DoiTac> {

    return new Promise((resolve, reject) => {
      this.getDoiTacs().then(res => {
        let maxMaDoiTac: number = _.maxBy(res, function (o) { return o['id']; }).id;
        doiTac.id = +maxMaDoiTac + 1;
        this.db.ref('/partner/' + doiTac.id).set(doiTac, (error?) => {
          if (error) {
            reject(new Error('firebase errors'));
          }
        }).then((res) => {
          resolve(res);
        })
      })

    })
  }
  putDoiTac(doiTac: DoiTac): Promise<boolean> {
    return new Promise((resolve, reject) => {
      logger.debug('PutDoiTac', doiTac);
      this.db.ref('/partner/' + doiTac.id).set(doiTac, (error?) => {
        if (error) {
          reject(new Error('firebase errors'));
        }
      }).then((res) => {
        resolve(res);
      })
    })
  }
  deleteDoiTac(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let doiTacBiXoa = this.db.ref('/partner/' + id);
      doiTacBiXoa.remove().then(res => {
        resolve(res)
      })
        .catch(err => {
          reject(err)
        });
    })
  }
  deleteDoiTacs(ids: number[]): Promise<boolean> {
    let tasks: Promise<boolean>[];
    tasks = ids.map(x => this.deleteDoiTac(x));
    return new Promise((resolve, reject) => {
      Promise.all(tasks).then(values => {
        let result = values.reduce((previusVal, currnetVal) => previusVal && currnetVal);
        resolve(result);
      })
        .catch(err => reject(err))
    })

  }
}
