import { inject } from "aurelia-dependency-injection";
import { DialogService } from 'aurelia-dialog';
import { GridOptions, GridApi, ColumnApi } from "ag-grid";
import swal from 'sweetalert';

@inject()
export class DsPhongBan {

    private gridOptions: GridOptions;
    private showGrid: boolean;
    private rowData: any[];
    private listOfCountries: any[];
    private rowCount: string;
    private api: GridApi;
    private columnApi: ColumnApi;
    private allOfTheData: any = [];
    private columnDefs: any[];



    constructor() {
        this.allOfTheData = [
            {
                folder: true,
                open: true,
                name: 'C:',
                children: [
                    {
                        folder: true,
                        name: 'Windows',
                        size: '',
                        type: 'File Folder',
                        dateModified: '27/02/2014 04:12',
                        children: [
                            { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                            { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                            { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                        ]
                    },
                    {
                        folder: true,
                        name: 'Program Files',
                        size: '',
                        type: 'File Folder',
                        dateModified: '11/09/2013 02:11',
                        open: true,
                        children: [
                            {
                                folder: true,
                                name: 'ASUS',
                                size: '',
                                type: 'File Folder',
                                dateModified: '13/03/2014 1014',
                                children: [
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            },
                            {
                                folder: true,
                                name: 'Classic Shell', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                children: [
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            },
                            {
                                folder: true,
                                name: 'Common Files', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                children: [
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            },
                            {
                                folder: true,
                                name: 'DisplayLink Core Software', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                children: [
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            },
                            {
                                folder: true,
                                name: 'Intel', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                children: [
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            },
                            {
                                folder: true,
                                name: 'Internet Explorer', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                children: [
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            },
                            {
                                folder: true,
                                name: 'Intel Corporation', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                children: [
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            },
                            {
                                folder: true,
                                name: 'Java', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                open: true,
                                children: [
                                    {
                                        folder: true,
                                        name: 'jdk1.8.0', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                        children: [
                                            { name: 'java.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                            { name: 'javac.exe', size: '1 kb', type: 'Application', dateModified: '27/11/2012 04:12' },
                                            { name: 'weblaunch.exe', size: '21 kb', type: 'Application', dateModified: '18/03/2014 00:56' }
                                        ]
                                    },
                                    {
                                        folder: true,
                                        name: 'jre1.8.0_31', size: '', type: 'File Folder', dateModified: '13/03/2014 1014',
                                        children: [
                                            { name: 'java.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                            { name: 'javac.exe', size: '1 kb', type: 'Application', dateModified: '27/11/2012 04:12' },
                                            { name: 'weblaunch.exe', size: '21 kb', type: 'Application', dateModified: '18/03/2014 00:56' }
                                        ]
                                    },
                                    { name: 'bfsve.exe', size: '56 kb', type: 'Application', dateModified: '13/03/2014 10:14' },
                                    { name: 'csup.txt', size: '1 kb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                                    { name: 'diagwrn.xml', size: '21 kb', type: 'XML File', dateModified: '18/03/2014 00:56' }
                                ]
                            }
                        ]
                    },
                    { group: false, name: 'boot.ini', size: '16 kb', type: 'Boot File', dateModified: '27/11/2012 04:12' },
                    { group: false, name: 'system.cfg', size: '13 kb', type: 'System File', dateModified: '18/03/2014 00:56' }
                ]
            },
            {
                folder: true,
                name: 'D:',
                children: [
                    { name: 'Game of Thrones s05e01.avi', size: '1034 mb', type: 'Movie', dateModified: '13/03/2014 10:14' },
                    { name: 'The Knick s01e01', size: '523 mb', type: 'Text Document', dateModified: '27/11/2012 04:12' },
                    { name: 'musicbackup1.zip', size: '25 mb', type: 'Compressed Zip File', dateModified: '18/03/2014 00:56' },
                    { name: 'musicbackup2.zip', size: '25 mb', type: 'Compressed Zip File', dateModified: '18/03/2014 00:56' }
                ]
            }
        ];
        this.columnDefs = [
            {
                headerName: "Name", field: "name", width: 250,
                cellRenderer: 'group',
                cellRendererParams: {
                    innerRenderer: this.innerCellRenderer
                }
            },
            { headerName: "Size", field: "size", width: 70, cellStyle: this.sizeCellStyle },
            { headerName: "Type", field: "type", width: 150 },
            { headerName: "Date Modified", field: "dateModified", width: 150 }
        ];
        this.gridOptions = {
            columnDefs: this.columnDefs,
            rowData: this.allOfTheData,
            rowSelection: 'multiple',
            enableColResize: true,
            enableSorting: true,
            animateRows: true,
            rowHeight: 20,
            getNodeChildDetails: function (file) {
                if (file.folder) {
                    return {
                        group: true,
                        children: file.children,
                        expanded: file.open
                    };
                } else {
                    return null;
                }
            },

        };

    }
    activate() {

    }
    sizeCellStyle() {
        return { 'text-align': 'right' };
    }
    innerCellRenderer(params) {
        var image;
        if (params.node.group) {
            image = params.node.level === 0 ? 'disk' : 'folder';
        } else {
            image = 'file';
        }
        var imageFullUrl = 'http://i567.photobucket.com/albums/ss117/DoctorWhat/Tesla-Electric.gif';
        return '<img src="' + imageFullUrl + '" style="padding-left: 4px;" width="20" /> ' + params.data.name;
    }

    onReady() {
        // this.createNewDatasource();

    }

    createNewDatasource() {
        if (!this.allOfTheData) {
            return;
        }
        var dataSource = {
            getRows: (params) => {
                setTimeout(() => {
                    var rowsThisPage = this.allOfTheData.slice(params.startRow, params.endRow);
                    var lastRow = -1;
                    if (this.allOfTheData.length <= params.endRow) {
                        lastRow = this.allOfTheData.length;
                    }
                    params.successCallback(rowsThisPage, lastRow);
                }, 500);

            },
            rowCount: this.allOfTheData.length
        };

        this.gridOptions.api.setDatasource(dataSource);

    }
    //ag-grid events

    // view events



}
