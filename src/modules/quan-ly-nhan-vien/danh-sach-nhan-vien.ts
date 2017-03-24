import { logger } from './logger';
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

  private selectedList: NhanVien[] = [];
  private selectedItem: NhanVien;


  constructor(private quanLyNhanVienService: QuanLyNhanVienServiceInterface, private dialogService) {
    this.columnDefs = [
      {
        headerName: "Chọn",
        width: 30,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Mã", field: "MaNv", filter: 'number'
      },
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
    this.selectedItem = new NhanVien(e.data);
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "edit":
          return this.onActionEditClick();
      }
    }
  }
  public onActionViewClick(data: NhanVien) {
    logger.info("View action clicked", data);
}


  public onActionEditClick() {
    this.dialogService.open({ viewModel: SaveNhanVien, model: this.selectedItem }).then((result) => {
      if (!result.wasCancelled) {
        logger.info('Save', result.output);
        let editedNhanVien = result.output;
        this.quanLyNhanVienService.PutNhanVien(editedNhanVien).then((res) => {
          swal("Thành công", "Lưu thành công", "success");
          this.onReady();
        }).catch((err) => {

          swal("Không thành công", `${err}`, "error")
        });
      } else {
        logger.info("Cancel");
      }
    });
  }

  themMoiNhanVien() {
    this.dialogService.open({ viewModel: SaveNhanVien, model: new NhanVien() }).then((result) => {
      if (!result.wasCancelled) {
        logger.info('Save', result.output);
        let themMoiNhanVien: NhanVien = result.output;
        this.quanLyNhanVienService.PostNhanVien(themMoiNhanVien)
          .then((res) => {
            swal("Thành công", "Lưu thành công", "success");
            this.onReady();
          }).catch((err) => {

            swal("Không thành công", `${err}`, "error")
          });
      } else {
        logger.info('Cancel');
      }
    });
  }

  //ag-grid events
  onRowDoubleClicked(e) {
    let nhanVien = new NhanVien(e.data);
    this.onActionEditClick();
  }
  onRowSelected(e) {
    this.selectedList = this.gridOptions.api.getSelectedRows().map(x => new NhanVien(x));
  }
  deselectAll() {
    this.gridOptions.api.deselectAll();
  }

  // view events
  deleteSelected() {
    let maNvs = this.selectedList.map(x => x.MaNv);
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
              this.selectedList = [];
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
