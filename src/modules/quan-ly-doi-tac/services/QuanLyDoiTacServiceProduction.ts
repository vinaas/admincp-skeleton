import { DoiTac } from './../models/doi-tac';
import { QuanLyDoiTacServiceInterface } from './QuanLyDoiTacServiceInterFace';
export class QuanLyDoiTacServiceProduction implements QuanLyDoiTacServiceInterface {
  getDoiTac(maNv: number): Promise<DoiTac> {
    throw new Error('Method not implemented.');
  }
  getDoiTacs(): Promise<DoiTac[]> {
    throw new Error('Method not implemented.');
  }
  postDoiTac(DoiTac: DoiTac): Promise<DoiTac> {
    throw new Error('Method not implemented.');
  }
  putDoiTac(DoiTac: DoiTac): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteDoiTac(maNv: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteDoiTacs(maNvs: number[]): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getDoiTacsByFilter(filter: any): Promise<DoiTac[]> {
    throw new Error('Method not implemented.');
  }

   

}
