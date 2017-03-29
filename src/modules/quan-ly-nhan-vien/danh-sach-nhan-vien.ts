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
  private listOfCountries: any[];
  private api: GridApi;
  private columnApi: ColumnApi;
  private allOfTheData: any = [];
  private columnDefs: any[];

  private selecteddRows: NhanVien[] = [];
  private selectedRow: NhanVien = null;


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
      rowHeight: 48,
      icons: {
        checkboxChecked: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMTQzMkY1NDIyMjhFNjExQkVGOEFCQUI5MzdBNjFEMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMzBBQkU2ODI4MjQxMUU2QjlDRUZCNUFDREJGRTVDMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMzBBQkU2NzI4MjQxMUU2QjlDRUZCNUFDREJGRTVDMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NDMyRjU0MjIyOEU2MTFCRUY4QUJBQjkzN0E2MUQxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjExNDMyRjU0MjIyOEU2MTFCRUY4QUJBQjkzN0E2MUQxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O+zv0gAAAQ1JREFUeNpilJvw35OBgWEuEEsyEAeeA3EyI1DjMxI0wTUzkaEJBCSZiFVpJcvAsDqEgUFVCMInSqOeOAPDLG8GBjNpBoZCCyI1KggwMCzwZ2DgZWdgOPWUgaF4F5pGDxWgqT4MDPzsSB7hYWBYHMDAIMzJwHDjDQND0mYGhu9/0DT6qTEwuCszMOyIZmAwkoTYALJJjp+B4cEHBoaEjQwMn38iDAVFx38wA4gzTBgYSiwhEi++MDDI8DEwvP3OwBC0CqIZGcBtBOmefoaBIXQNA8PvfxBNf4B03AZMTVgD5xwwXcQDFX/8wcAw+RQDw5VX2AMN7lRSARM07ZEKXoA0poAYJGh6CkrkAAEGAKNeQxaS7i+xAAAAAElFTkSuQmCC"/>'
      },
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
    this.selecteddRows = [];
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
    logger.info("View action clicked", data);
  }


  public onActionEditClick(data: NhanVien) {
    this.dialogService.open({ viewModel: SaveNhanVien, model: new NhanVien(data) }).then((result) => {
      if (!result.wasCancelled) {
        logger.info('Save', result.output);
        let editedNhanVien = result.output;
        this.quanLyNhanVienService.PutNhanVien(editedNhanVien).then((res) => {
          swal("Thành công", "Lưu thành công", "success");
          this.createNewDatasource();
        }).catch((err) => {

          swal("Không thành công", `${err}`, "error")
        });
      } else {
        logger.info("Cancel Edit");
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
            this.createNewDatasource();
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
    this.onActionEditClick(nhanVien);
  }
  onRowSelected(e) {
    this.selectedRow = new NhanVien(e.node.data);
    this.selecteddRows = this.gridOptions.api.getSelectedRows().map(x => new NhanVien(x));
  }
  deselectAll() {
    this.gridOptions.api.deselectAll();
  }

  // view events
  deleteSelected() {
    let maNvs = this.selecteddRows.map(x => x.MaNv);
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
              this.selecteddRows = [];
              this.createNewDatasource();
            }).catch((err) => {

              swal("Không thành công", `${err}`, "error")
            });
        } else {
          swal("Đã hủy", "đã hủy thao tác", "error");
        }
      })

  }

}
