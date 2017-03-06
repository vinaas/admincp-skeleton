import { autoinject, customElement } from 'aurelia-framework'

import { GridOptions } from 'ag-grid';
// only import this if you are using the ag-Grid-Enterprise
import 'ag-grid-enterprise/main';

@autoinject()
@customElement('editor-example')
export class EditorExample {

  private gridOptions: GridOptions;
  private data;
  private columnDefs = [
    // this row just shows the row index, doesn't use any data from the row
    {
      headerName: "#", width: 50, cellRenderer: function (params) {
        return params.node.id + 1;
      }
    },
    { headerName: "Athlete", field: "athlete", width: 150 },
    { headerName: "Age", field: "age", width: 90 },
    { headerName: "Country", field: "country", width: 120 },
    { headerName: "Year", field: "year", width: 90 },
    { headerName: "Date", field: "date", width: 110 },
    { headerName: "Sport", field: "sport", width: 110 },
    { headerName: "Gold", field: "gold", width: 100 },
    { headerName: "Silver", field: "silver", width: 100 },
    { headerName: "Bronze", field: "bronze", width: 100 },
    { headerName: "Total", field: "total", width: 100 }
  ];

  constructor() {

    this.gridOptions = <GridOptions>{
      enableSorting: true,
      enableFilter: true,
      debug: true,
      rowSelection: 'multiple',
      enableColResize: true,
      paginationPageSize: 3,
      columnDefs: this.columnDefs,
      rowModelType: 'pagination'
    };

    // this.gridOptions.datasource = {}
    // this.gridOptions.rowData = this.createRowData();

    let data = [{ "athlete": "Michael & Phelps", "age": 23, "country": "United States", "year": 2008, "date": "24/08/2008", "sport": "Swimming", "gold": 8, "silver": 0, "bronze": 0, "total": 8 },
    { "athlete": "Michael & Phelps", "age": 19, "country": "United States", "year": 2004, "date": "29/08/2004", "sport": "Swimming", "gold": 6, "silver": 0, "bronze": 2, "total": 8 },
    { "athlete": "Michael & Phelps", "age": 27, "country": "United States", "year": 2012, "date": "12/08/2012", "sport": "Swimming", "gold": 4, "silver": 2, "bronze": 0, "total": 6 },
    { "athlete": "Natalie Coughlin", "age": 25, "country": "United States", "year": 2008, "date": "24/08/2008", "sport": "Swimming", "gold": 1, "silver": 2, "bronze": 3, "total": 6 }];
    let dataSource = {
      //rowCount: ???, - not setting the row count, infinite paging will be used
      getRows: function (params) {
        // this code should contact the server for rows. however for the purposes of the demo,
        // the data is generated locally, a timer is used to give the experience of
        // an asynchronous call
        console.log('asking for ' + params.startRow + ' to ' + params.endRow);

        // take a chunk of the array, matching the start and finish times
        // var dataAfterSortingAndFiltering = sortAndFilter(params.sortModel, params.filterModel);
        // var rowsThisPage = dataAfterSortingAndFiltering.slice(params.startRow, params.endRow);
        // see if we have come to the last page. if we have, set lastRow to
        // the very last row of the last page. if you are getting data from
        // a server, lastRow could be returned separately if the lastRow
        // is not in the current page.
        var lastRow = -1;
        if (data.length <= params.endRow) {
          lastRow = data.length;
        }

        params.successCallback(data, lastRow);

      },
      rowCount: 4
    };
    this.gridOptions.datasource = (dataSource);
    console.log("datasource", this.gridOptions);
  }

  attached() {

  }
  private createRowData() {
    return [
      { name: "Bob", mood: "Happy", number: 10 },
      { name: "Harry", mood: "Sad", number: 3 },
      { name: "Sally", mood: "Happy", number: 20 },
      { name: "Mary", mood: "Sad", number: 5 },
      { name: "John", mood: "Happy", number: 15 },
      { name: "Jack", mood: "Happy", number: 25 },
      { name: "Sue", mood: "Sad", number: 43 },
      { name: "Sean", mood: "Sad", number: 1335 },
      { name: "Niall", mood: "Happy", number: 2 },
      { name: "Alberto", mood: "Happy", number: 123 },
      { name: "Fred", mood: "Sad", number: 532 },
      { name: "Jenny", mood: "Happy", number: 34 },
      { name: "Larry", mood: "Happy", number: 13 },
    ];
  }
}
