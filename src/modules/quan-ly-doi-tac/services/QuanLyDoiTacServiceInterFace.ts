import { DoiTac } from "../models/doi-tac";
export interface QuanLyDoiTacServiceInterface {
  getDoiTac(maNv: number): Promise<DoiTac>;
  getDoiTacs(): Promise<Array<DoiTac>>;
  postDoiTac(DoiTac: DoiTac): Promise<DoiTac>;
  putDoiTac(DoiTac: DoiTac): Promise<boolean>;
  deleteDoiTac(maNv: number): Promise<boolean>;
  deleteDoiTacs(maNvs: number[]): Promise<boolean>;
  getDoiTacsByFilter(filter: any): Promise<Array<DoiTac>>;
}
