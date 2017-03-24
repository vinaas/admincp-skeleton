import { DoiTac } from "../models/doi-tac";
export interface QuanLyDoiTacServiceInterface {
  GetDoiTac(maNv: number): Promise<DoiTac>;
  GetDoiTacs(): Promise<Array<DoiTac>>;
  PostDoiTac(DoiTac: DoiTac): Promise<DoiTac>;
  PutDoiTac(DoiTac: DoiTac): Promise<boolean>;
  DeleteDoiTac(maNv: number): Promise<boolean>;
  DeleteDoiTacs(maNvs: number[]): Promise<boolean>;
}
