import axios from 'axios';
import { SaveDoiTac } from './dialogs/save-doi-tac';
import { DialogService } from 'aurelia-dialog';
import  swal from 'sweetalert';
import { logger } from './logger';
import { GridOptions } from 'ag-grid';
import { GridApi } from 'ag-grid';
import { QuanLyDoiTacServiceInterface } from './services/QuanLyDoiTacServiceInterFace';
import { QuanLyDoiTacServicePrototype } from './services/QuanLyDoiTacServicePrototype';
import { inject } from 'aurelia-dependency-injection';
import { DoiTac } from './models/doi-tac';
@inject(QuanLyDoiTacServicePrototype, DialogService)
export class DanhSachDoiTac {
    listItem: DoiTac[] = [];
    selectedItem: DoiTac;
    selectedItems: DoiTac[] = [];
    filter: any;

    // ag-GridApi
    gridOptions: GridOptions;
    api: GridApi;
    columnDefs: any[];

    constructor(private quanLyDoiTacSrv: QuanLyDoiTacServiceInterface, private dialogService: DialogService) {
        this.columnDefs = [
            {
                headerName: "Chọn",
                width: 30,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: "Mã", field: "Id", filter: 'number'
            },
            { headerName: "Tên", field: "Ten", filter: 'text', filterParams: { apply: true, newRowsAction: 'keep' }, suppressMenu: false, suppressSorting: true },
            { headerName: "Địa Chỉ", field: "DiaChi", filter: 'text', filterParams: { newRowsAction: 'keep' }, suppressMenu: false, suppressSorting: true },
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
                return item.Id;
            }
        };
    }
    activate() {
        return this.quanLyDoiTacSrv.GetDoiTacs().then((res) => {
            this.listItem = res;
        })
    }
    onReady() {
        this.loadDatasource();
    }
    loadDatasource() {
        this.selectedItems = [];
        if (!this.listItem) {
            return;
        }
        var dataSource = {
            getRows: (params) => {

                this.quanLyDoiTacSrv.GetDoiTacs().then(res => {
                    this.listItem = res;
                    var rowsThisPage = this.listItem.slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    if (this.listItem.length <= params.endRow) {
                        lastRow = this.listItem.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                })
            },
            rowCount: this.listItem.length
        };

        this.gridOptions.api.setDatasource(dataSource);

    }
    public onRowClicked(e) {
        logger.debug('row clicked', e);
        this.selectedItem = new DoiTac(e.data);
        if (e.event.target !== undefined) {
            let data = e.data;
            let actionType = e.event.target.getAttribute("data-action-type");

            switch (actionType) {
                case "edit":
                    return this.onActionEditClick();
            }
        }
    }
    public onActionViewClick(data: DoiTac) {
        logger.info("View action clicked", data);
    }


    public onActionEditClick() {
        this.dialogService.open({ viewModel: SaveDoiTac, model: this.selectedItem }).then((result) => {
            if (!result.wasCancelled) {
                logger.info('Save', result.output);
                let editedDoiTac = result.output;
                this.quanLyDoiTacSrv.PutDoiTac(editedDoiTac).then((res) => {
                    swal("Thành công", "Lưu thành công", 200, "success");
                    this.loadDatasource();
                }).catch((err) => {

                    swal("Không thành công", `${err}`, "error")
                });
            } else {
                logger.info("Cancel");
            }
        });
    }

    themMoiDoiTac() {
        this.selectedItem = new DoiTac();
        this.dialogService.open({ viewModel: SaveDoiTac, model: this.selectedItem }).then((result) => {
            if (!result.wasCancelled) {
                logger.info('Save', result.output);
                let themMoiDoiTac: DoiTac = result.output;
                this.quanLyDoiTacSrv.PostDoiTac(themMoiDoiTac)
                    .then((res) => {
                        swal("Thành công", "Lưu thành công", "success");
                        this.loadDatasource();
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
        let doiTac = new DoiTac(e.data);
        this.onActionEditClick();
    }
    onRowSelected(e) {
        this.selectedItems = this.gridOptions.api.getSelectedRows().map(x => new DoiTac(x));
    }
    deselectAll() {
        this.gridOptions.api.deselectAll();
    }

    // view events
    deleteSelected() {
        let Ids = this.selectedItems.map(x => x.Id);
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
                    this.quanLyDoiTacSrv.DeleteDoiTacs(Ids)
                        .then(res => {
                            swal("Thành công", "Lưu thành công", "success");
                            this.selectedItems = [];
                            this.loadDatasource();
                        }).catch((err) => {

                            swal("Không thành công", `${err}`, "error")
                        });
                } else {
                    swal("Đã hủy", "đã hủy thao tác", "error");
                }
            })

    }
    search() {
        this.quanLyDoiTacSrv.GetDoiTacsByFilter(this.filter)
            .then(data => { this.listItem = data })
            .catch(err => {
                swal('Lỗi', err, 'error');
            })
    }


}