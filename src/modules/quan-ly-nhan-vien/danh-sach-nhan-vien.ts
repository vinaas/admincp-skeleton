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
  private allOfTheData: any = [];
  private columnDefs: any[];

  private selectdRows: NhanVien[] = [];


  constructor(private quanLyNhanVienService: QuanLyNhanVienServiceInterface, private dialogService) {
    this.columnDefs = [
      {
        headerName: "Chọn",
        width: 30,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      // {
      //   headerName: "Mã", field: "MaNv", filter: 'number'
      // },
      { headerName: "Chức vụ", field: "ChucVu", suppressMenu: false, suppressSorting: true },
      { headerName: "Họ tên", field: "HoTen", filter: 'text', filterParams: { apply: true, newRowsAction: 'keep' }, suppressMenu: false, suppressSorting: true },
      { headerName: "Email", field: "Email", filter: 'text', filterParams: { newRowsAction: 'keep' }, suppressMenu: false, suppressSorting: true },
      {
        headerName: "Hành động",
        suppressMenu: true,
        suppressSorting: true,
        template:
        `<button type="button" class="btn btn-default btn-xs" data-action-type="edit">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Chi tiết
        </button>
        `
      }
    ];
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      enableColResize: true,
      paginationPageSize: 20,
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
    return this.quanLyNhanVienService.GetNhanViens().then((res) => {
      this.allOfTheData = res;
    })

  }

  onReady() {
    this.createNewDatasource();
  }
  createNewDatasource() {
    if (!this.allOfTheData) {
      return;
    }
    var dataSource = {
      getRows: (params) => {
       
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
  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "edit":
          return this.onActionEditClick(data);
      }
    }
  }
  public onActionViewClick(data: NhanVien) {
    console.log("View action clicked", data);
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
        this.quanLyNhanVienService.PostNhanVien(themMoiNhanVien)
          .then((res) => {
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

  //ag-grid events
  onRowDoubleClicked(e) {
    console.log("event", );
  }
  onRowSelected(e) {
    this.selectdRows = this.gridOptions.api.getSelectedRows().map(x => new NhanVien(x));
  }

  // view events
  deleteSelected() {
    let maNvs = this.selectdRows.map(x => x.MaNv);
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
          this.quanLyNhanVienService.DeleteNhanViens(maNvs)
            .then(res => {
              swal("Thành công", "Lưu thành công", "success");
              this.onReady();
            }).catch((err) => {

              swal("Không thành công", `${err}`, "error")
            });
        } else {
          swal("Đã hủy", "đã hủy thao tác", "error");
        }
      })

  }
}
