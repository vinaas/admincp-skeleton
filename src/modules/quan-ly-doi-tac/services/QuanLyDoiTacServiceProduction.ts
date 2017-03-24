import { DoiTac } from './../models/doi-tac';
import { QuanLyDoiTacServiceInterface } from './QuanLyDoiTacServiceInterFace';
export class QuanLyDoiTacServiceProduction implements QuanLyDoiTacServiceInterface {    
GetDoiTac(maNv: number): Promise<DoiTac> {
        throw new Error('Method not implemented.');
    }
    GetDoiTacs(): Promise<DoiTac[]> {
        throw new Error('Method not implemented.');
    }
    PostDoiTac(DoiTac: DoiTac): Promise<DoiTac> {
        throw new Error('Method not implemented.');
    }
    PutDoiTac(DoiTac: DoiTac): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    DeleteDoiTac(maNv: number): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    DeleteDoiTacs(maNvs: number[]): Promise<boolean> {
        throw new Error('Method not implemented.');
    }


}