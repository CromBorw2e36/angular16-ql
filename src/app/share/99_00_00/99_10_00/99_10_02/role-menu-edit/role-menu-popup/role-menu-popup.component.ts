import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { Properties } from 'devextreme/ui/data_grid';
import { Properties as PropertiesPopup } from 'devextreme/ui/popup';
import { DataGridComponent, IDataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { Action_Type_Enum, IPopupComponent } from 'src/app/components/js-devextreme/popup/enum_action';
import { PopupComponent } from 'src/app/components/js-devextreme/popup/popup.component';
import { DatagridColumnSettingsService } from 'src/app/share/99_00_00/datagrid-column-setting/service/datagrid-column-settings.service';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { HomePageService } from 'src/app/system/page/home-page/service/home-page.service';
import { Account, AccountsClient, MenuPermissionsClient, SysMenu } from 'src/app/system/server/api_share';

@Component({
  selector: 'role-menu-popup',
  templateUrl: './role-menu-popup.component.html',
  styleUrls: ['./role-menu-popup.component.scss']
})
export class RoleMenuPopupComponent extends LayoutComponentBase implements IPopupComponent, IDataGridComponent {


  constructor(
    injector: Injector,
    private dataGirdColumnSettingsService: DatagridColumnSettingsService,
    private homePageService: HomePageService,
    private meuPermissionClient: MenuPermissionsClient
  ) {
    super(injector)
    this.titlePopUp = this.translate(this.getMenuSelected().nameVN ?? '', this.getMenuSelected().name ?? '')
    this.setShowPopup.bind(this);


    this.propertyDataGrid = {
      keyExpr: 'menuid',
      height: '60vh',
      width: '100%',
      columnAutoWidth: true,
      scrolling: {
        mode: 'virtual'
      },
      pager: {
        displayMode: 'full',
        showNavigationButtons: true,
        showPageSizeSelector: true,
        visible: true,
      },
      selection: {
        mode: 'multiple',
        selectAllMode: 'page',
        allowSelectAll: true,
        showCheckBoxesMode: 'onClick'
      }
    }

  }
  propertiesPopupComponent?: PropertiesPopup | undefined;
  listAction?: Action_Type_Enum[] | undefined;

  titlePopUp: string;

  InputMaster: Array<SysMenu> = [];
  listDialogAction: Action_Type_Enum[] = [Action_Type_Enum.SAVE, Action_Type_Enum.CLOSE]
  typeAction?: Action_Type_Enum | undefined;
  propertyDataGrid: Properties;

  @Input() state_account: Account | undefined;

  @Output() onDataSelected: EventEmitter<Array<SysMenu>> = new EventEmitter<Array<SysMenu>>();

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;
  @ViewChild('popupComponent') popupComponent: PopupComponent | undefined;

  ngAfterViewInit(): void {
    if (this.popupComponent && this.popupComponent.popupComponent) {
      this.popupComponent.popupComponent.fullScreen = true;
      this.popupComponent.popupComponent.instance._refresh();
    }
  }


  setShowPopup(ev: { state: boolean, data: any, typeAction?: Action_Type_Enum }): void {
    this.typeAction = ev.typeAction;
    if (this.popupComponent) this.popupComponent.setShow(ev.state);
    if (ev.state) {
      switch (this.typeAction) {
        case Action_Type_Enum.ADD: {
          this.OnloadDataSource();
          break;
        }
        default: {
          this.InputMaster = [];
          break;
        }
      }


    } else {
      this.InputMaster = [];
    }
  }

  onActionClick_PopupComponent(ev: { code: string; }): void {
    switch (ev.code) {
      case Action_Type_Enum.CLOSE: {
        this.setShowPopup({ state: false, data: undefined });
        break;
      }
      case Action_Type_Enum.SAVE: {
        if (this.dataGridComponent) {
          const rowSelect = this.dataGridComponent.getRowSelectedData<SysMenu>();
          if (rowSelect && rowSelect.length > 0) {
            this.onDataSelected.emit(rowSelect);
            this.setShowPopup({ state: false, data: undefined });
          }
          else {
            this.showMessageError(this.translate("Vui lòng chọn ít nhất 1 dòng để thực hiện", "Please select at least 1 row to execute"));
          }
        }
        break;
      }
    }
  }

  OnloadDataSource() {
    if (this.state_account) {
      this.meuPermissionClient.roleMenuPermissionByUserNotYet(this.state_account).subscribe(res => {
        if (res.status == 0) {
          this.InputMaster = res.data!;
        } else {
          this.showMessageError(res.msg!);
        }
      }, error => {

      });
    }
  }

}
