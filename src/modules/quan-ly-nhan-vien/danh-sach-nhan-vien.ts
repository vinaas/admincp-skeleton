
import { inject } from "aurelia-dependency-injection";
import { QuanLyNhanVienServicePrototype } from "./services/QuanLyNhanVienService.prototype";
import { IQuanLyNhanVienService } from "./services/IQuanLyNhanVienService";
import { NhanVien } from "./models/nhan-vien";
import { GridOptions, GridApi, ColumnApi } from "ag-grid";

@inject(QuanLyNhanVienServicePrototype)
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
  constructor(private quanLyNhanVienService: IQuanLyNhanVienService) {
    this.columnDefs = [
      { headerName: "Mã", field: "MaNv", filter: 'text', filterParams: { apply: "false", newRowsAction: 'keep' } },
      { headerName: "Chức vụ", field: "ChucVu", suppressMenu: true },
      { headerName: "Họ tên", field: "HoTen", filter: 'text', filterParams: { newRowsAction: 'keep' } },
      { headerName: "Email", field: "Email", filter: 'text', filterParams: { newRowsAction: 'keep' } },
      {
        headerName: "Hành động",
        suppressMenu: true,
        suppressSorting: true,
        template:
        `<button type="button" data-action-type="view" >
               Xem
             </button>
          <button type="button" data-action-type="edit" >
               Sửa
          </button>
          <button type="button" data-action-type="remove" >
               Xóa
          </button>`
      }
    ];
    this.gridOptions = {
      enableSorting: true,
      enableFilter: true,
      enableColResize: true,
      paginationPageSize: 10,
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
  public onActionViewClick(data: any) {
    console.log("View action clicked", data);
  }

  public onActionRemoveClick(data: any) {
    console.log("Remove action clicked", data);
  }
  public onActionEditClick(data: any) {
    console.log("Edit action clicked", data);
  }
  createNewDatasource() {
    if (!this.allOfTheData) {
      // in case user selected 'onPageSizeChanged()' before the json was loaded
      return;
    }
    var dataSource = {
      //rowCount: ???, - not setting the row count, infinite paging will be used
      getRows: (params) => {
        // this code should contact the server for rows. however for the purposes of the demo,
        // the data is generated locally, a timer is used to give the experience of
        // an asynchronous call
        console.log('asking for ' + params.startRow + ' to ' + params.endRow);
        setTimeout(() => {
          // take a chunk of the array, matching the start and finish times
          // var dataAfterSortingAndFiltering = sortAndFilter(params.sortModel, params.filterModel);
          console.log("allOfTheDate when create datasource : ", this.allOfTheData);
          var rowsThisPage = this.allOfTheData.slice(params.startRow, params.endRow);
          // see if we have come to the last page. if we have, set lastRow to
          // the very last row of the last page. if you are getting data from
          // a server, lastRow could be returned separately if the lastRow
          // is not in the current page.
          var lastRow = -1;
          if (this.allOfTheData.length <= params.endRow) {
            lastRow = this.allOfTheData.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        }, 500);
      }
    };

    this.gridOptions.api.setDatasource(dataSource);

  }
}
