import { NhanVien } from "../models/nhan-vien";
export interface IQuanLyNhanVienService {
  GetNhanVien(maNv: number): Promise<NhanVien>;
  GetNhanViens(): Promise<Array<NhanVien>>;
  PostNhanVien(nhanVien: NhanVien): Promise<NhanVien>;
  PutNhanVien(nhanVien: NhanVien): Promise<boolean>;
  DeleteNhanVien(maNv: number): Promise<boolean>;
}
