import { IQuanLyNhanVienService } from "./IQuanLyNhanVienService";
import { NhanVien } from "../models/nhan-vien";

export class QuanLyNhanVienService implements IQuanLyNhanVienService {
  GetNhanVien(maNv: number): Promise<NhanVien> {
    throw new Error('Method not implemented.');
  }
  GetNhanViens(): Promise<NhanVien[]> {
    throw new Error('Method not implemented.');
  }
  PostNhanVien(nhanVien: NhanVien): Promise<NhanVien> {
    throw new Error('Method not implemented.');
  }
  PutNhanVien(nhanVien: NhanVien): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  DeleteNhanVien(maNv: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }


 }
