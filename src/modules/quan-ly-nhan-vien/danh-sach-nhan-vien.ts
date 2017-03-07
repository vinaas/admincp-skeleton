import { QuanLyNhanVienServiceInterface } from './services/QuanLyNhanVienServiceInterface';
import { SaveNhanVien } from './dialogs/luu-nhan-vien';

import { inject } from "aurelia-dependency-injection";
import { QuanLyNhanVienServicePrototype } from "./services/QuanLyNhanVienService.prototype";
import { NhanVien } from "./models/nhan-vien";
import { DialogService } from 'aurelia-dialog';
import { GridOptions, GridApi, ColumnApi } from "ag-grid";
import swal from 'sweetalert';

@inject(QuanLyNhanVienServicePrototype, DialogService)
export class DanhSachNhanVien {

  private gridOptions: GridOptions;
  private showGrid: boolean;
  private rowData: any[];
  private listOfCountries: any[];
  private rowCount: string;
  private api: GridApi;
  private columnApi: ColumnApi;
  private allOfTheData: any;
  private columnDefs: any[];
  constructor(private quanLyNhanVienService: QuanLyNhanVienServiceInterface, private dialogService) {
    this.columnDefs = [
      {
        headerName: "Mã", field: "MaNv", filter: 'number'
      },
      { headerName: "Chức vụ", field: "ChucVu", suppressMenu: false, suppressSorting: true },
      { headerName: "Họ tên", field: "HoTen", filter: 'text', filterParams: { apply: true, newRowsAction: 'keep' }, suppressMenu: false, suppressSorting: true },
      { headerName: "Email", field: "Email", filter: 'text', filterParams: { newRowsAction: 'keep' },suppressMenu: false, suppressSorting: true  },
      {
        headerName: "Hành động",
        suppressMenu: true,
        suppressSorting: true,
        template:
        `<button type="button" class="btn btn-xs" data-action-type="view" >
               Xem
             </button>
          <button type="button" class="btn btn-xs" data-action-type="edit" >
               Sửa
          </button>
          <button type="button" class="btn btn-xs" data-action-type="remove" >
               Xóa
          </button>`
      }
    ];
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      enableColResize: true,
      paginationPageSize: 100,
      columnDefs: this.columnDefs,
      rowModelType: 'pagination',
      rowSelection: 'multiple',
      animateRows: true,
      getRowNodeId: function (item) {
        return item.MaNv;
      }
    };

  }
  activate() {
    let nhanVien = new NhanVien();
    nhanVien.MaNv = 124;
    nhanVien.Email = "tungpt.hd@gmail.com";
    nhanVien.HoTen = "Pham Tung";
    nhanVien.ChucVu = "dev";
    return this.quanLyNhanVienService.PostNhanVien(nhanVien);
  }
  onReady() {
    console.log("allOfTheData", this.allOfTheData);
    this.quanLyNhanVienService.GetNhanViens().then((res) => {
      this.allOfTheData = res;
      this.createNewDatasource();
    })
  }
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "view":
          return this.onActionViewClick(data);
        case "edit":
          return this.onActionEditClick(data);
        case "remove":
          return this.onActionRemoveClick(data);
      }
    }
  }
  public onActionViewClick(data: NhanVien) {
    console.log("View action clicked", data);
  }

  public onActionRemoveClick(data: NhanVien) {
    swal({
      title: "Bạn có chắc xóa không",
      text: "Bạn sẽ không khôi phục lại được nhân viên nếu đã bị xóa",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Có, Xóa",
      cancelButtonText: "Không, hủy thao tác!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
      (isConfirm) => {
        if (isConfirm) {
          this.quanLyNhanVienService.DeleteNhanVien(data.MaNv).then(res => {
            swal("Đã xóa!", "bạn đã xóa thành công", "success");
            this.onReady();
          }).catch(err => {
            swal("Lỗi", "Thực hiện không thành công", "error");
          })

        } else {
          swal("Đã hủy", "đã hủy thao tác", "error");
        }
      })
  }
  public onActionEditClick(data: NhanVien) {
    console.log("data from mng", data);
    this.dialogService.open({ viewModel: SaveNhanVien, model: new NhanVien(data) }).then((result) => {
      if (!result.wasCancelled) {
        console.log('Save', result.output);
        let editedNhanVien = result.output;
        this.quanLyNhanVienService.PutNhanVien(editedNhanVien).then((res) => {
          swal("Thành công", "Lưu thành công", "success");
          this.onReady();
        }).catch((err) => {

          swal("Không thành công", `${err}`, "error")
        });
      } else {
        console.log('Cancel');
      }
    });
  }

  themMoiNhanVien() {
    this.dialogService.open({ viewModel: SaveNhanVien, model: new NhanVien() }).then((result) => {
      if (!result.wasCancelled) {
        console.log('Save', result.output);
        let themMoiNhanVien: NhanVien = result.output;
        themMoiNhanVien.MaNv = this.getRandomId(); // fake id
        this.quanLyNhanVienService.PostNhanVien(themMoiNhanVien)
          .then((res) => {
            swal("Thành công", "Lưu thành công", "success");
            // this.onReady();
          }).catch((err) => {

            swal("Không thành công", `${err}`, "error")
          });
      } else {
        console.log('Cancel');
      }
    });
  }
  createNewDatasource() {
    if (!this.allOfTheData) {
      return;
    }
    var dataSource = {
      getRows: (params) => {
        // console.log('asking for ' + params.startRow + ' to ' + params.endRow);
        // setTimeout(() => {
        //   console.log("allOfTheDate when create datasource : ", this.allOfTheData);

        // }, 500);
        this.quanLyNhanVienService.GetNhanViens().then(res => {
          this.allOfTheData = res;
          var rowsThisPage = this.allOfTheData.slice(params.startRow, params.endRow);
          var lastRow = -1;
          if (this.allOfTheData.length <= params.endRow) {
            lastRow = this.allOfTheData.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        })
      },
      rowCount: this.allOfTheData.length
    };

    this.gridOptions.api.setDatasource(dataSource);

  }
  private getRandomId() {
    return this.getRandomInt(1000, 10000);
  }
  private getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
