import { Properties } from 'devextreme/ui/popup';
import { Component, EventEmitter, Input, Output, ViewChild, Inject, Injector, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DxDataGridComponent, DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { MenuV2Service } from '../../menu-v2/service/menu-v2.service';
import { SysGenRowTable, SysGenRowTablesClient } from 'src/app/system/server/api_share';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { DxoHeaderFilterComponent, DxoHeaderFilterModule } from 'devextreme-angular/ui/nested';
import { HeaderFilter, HeaderFilterSearchConfig } from 'devextreme/common/grids';

export interface IDataGridComponent {
  _tableName: string;
  propertyDataGrid: DxDataGridTypes.Properties;
  dataGridComponent: DataGridComponent | undefined;
}

@Component({
  selector: 'data-grid-component',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent extends LayoutComponentBase implements OnInit, OnChanges {

  constructor(
    private menuV2Service: MenuV2Service,
    private sysGenRowTableClient: SysGenRowTablesClient,
    injector: Injector,
  ) {
    super(injector);

    this.propertyDataGrid = {
      keyExpr: '',
      height: window.innerHeight - 50,
      scrolling: {
        mode: 'infinite'
      },
      selection: {
        mode: 'multiple',
        selectAllMode: 'page',
        allowSelectAll: true,
        showCheckBoxesMode: 'onClick'
      },
      pager: {
        allowedPageSizes: [15],
        displayMode: 'compact',
        showNavigationButtons: true,
        showPageSizeSelector: true,
        visible: true,
      },
      // editing: {
      //   allowAdding: true,
      //   allowUpdating: true,
      //   mode: 'popup',
      //   confirmDelete: true,
      //   allowDeleting: true,
      //   refreshMode: 'full'
      // }
    }

    this.getRowSelectedData.bind(this);
    this.getRowSelectedKeys.bind(this);

    this.headerFilter = {
      visible: true,
      search: {
        enabled: true,
        placeholder: this.translate('Tìm kiếm...', 'Search...'),
        mode: 'contains',
      } as HeaderFilterSearchConfig
    }

  }


  headerFilter: HeaderFilter;

  @Input() propertyDataGrid: DxDataGridTypes.Properties | undefined;
  @Input() dataSource: any = [];
  @Input() tableName!: string;
  @Input() columns: any = [];

  @Output() onRowDblClick = new EventEmitter<any>();
  @Output() onRowClick = new EventEmitter<any>();

  @ViewChild('dxDataGridComponent') dxDataGridComponent: DxDataGridComponent | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    // if ('propertyDataGrid' in changes) {
    //   this.propertyDataGrid = changes['propertyDataGrid'].currentValue;
    //   if (this.dxDataGridComponent !== undefined && this.propertyDataGrid !== undefined) {
    //     this.dxDataGridComponent.instance.option(this.propertyDataGrid)
    //   }
    // }
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  ngAfterViewInit(): void {
    if (this.dxDataGridComponent !== undefined && this.propertyDataGrid !== undefined) {
      this.dxDataGridComponent.instance.option(this.propertyDataGrid)
    }
  }

  onLoadData() {
    const paramObj = {
      table_name: this.tableName,
      companyCode: this.getUserInfo().codeCompany,
    } as SysGenRowTable;
    this.sysGenRowTableClient.genRowTableSearch(paramObj).subscribe(x => {
      if (x.status == 0) {
        this.columns = x.data;
        if (this.propertyDataGrid !== undefined) {
          this.propertyDataGrid.columns = this.columns;
        }
      } else {
        this.showMessageError(x.msg!)
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

  getRowSelectedData<T>() {
    if (this.dxDataGridComponent) {
      const rowSelect = this.dxDataGridComponent.instance.getSelectedRowsData();
      // console.log(rowSelect)
      return rowSelect as T[];
    }
    return [];
  }

  getRowSelectedKeys() {
    if (this.dxDataGridComponent) {
      const rowSelect = this.dxDataGridComponent.instance.getSelectedRowKeys();
      return rowSelect;
    }
    return [];
  }

}
