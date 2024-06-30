import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DxTreeViewComponent } from 'devextreme-angular';
import { DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SysMenu, Sys_Menu_Tree_View_MODEL } from 'src/app/system/server/api_share';
import { MenuV2Service } from './service/menu-v2.service';

@Component({
  selector: 'menu-v2-component',
  templateUrl: './menu-v2.component.html',
  styleUrls: ['./menu-v2.component.scss']
})
export class MenuV2Component extends LayoutComponentBase implements OnInit, OnChanges {

  constructor(
    injector: Injector,
    protected menuV2Service: MenuV2Service
  ) {
    super(injector);


    this.propertiedTreeView = {
      width: '100%',
      itemTemplate: 'item-menu',
      keyExpr: '',
      hasItemsExpr: '',
      parentIdExpr: '',
      noDataText: '',
      expandAllEnabled: true,
    } as DxTreeViewTypes.Properties;


  }


  @Input() InputMaster: Sys_Menu_Tree_View_MODEL[] = [];
  propertiedTreeView: DxTreeViewTypes.Properties;


  itemSelected: SysMenu = new Sys_Menu_Tree_View_MODEL();

  ngOnInit(): void {
    // console.table(this.InputMaster);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('InputMaster' in changes) {
      this.InputMaster = changes['InputMaster'].currentValue;
      this.pointFocusMenu()
    }
  }


  pointFocusMenu() {
    const getMenuLV1 = this.menuV2Service.getMenuSelectedByLv('1');
    const getMenuLV2 = this.menuV2Service.getMenuSelectedByLv('2');

    //console.log(getMenuLV1, getMenuLV2)

    if (getMenuLV2 && getMenuLV2.menuid) {
      const findIdx = this.InputMaster.findIndex(x => x.menuid === getMenuLV2.menuIDParent);
      const geValueCurrentIdx = this.InputMaster[findIdx]?.items;
      if (findIdx !== -1 && geValueCurrentIdx) {
        const findIdx2 = geValueCurrentIdx.findIndex(x => x.menuid === getMenuLV2.menuid);
        // console.log(this.InputMaster[findIdx].items)
        if (findIdx2 !== -1 && this.InputMaster[findIdx].items) {
          this.InputMaster[findIdx].items![findIdx2]!.selected = true;
        }
      }
    } else if (getMenuLV1) {
      const findIdx = this.InputMaster.findIndex(x => x.menuid === getMenuLV1.menuid);
      if (findIdx !== -1) {
        this.InputMaster[findIdx]!.selected = true;
      }
    } else {
      // Chua xu ly
    }

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  get getMenuParent() {
    return this.InputMaster.filter(x => x.menuIDParent == null);
  }

  handleClickMenu(p: ItemClickEvent | any) {
    const menu = p.itemData as Sys_Menu_Tree_View_MODEL;
    if (menu.menuid !== this.getMenuSelected().menuid) { // Check same menu
      this.itemSelected = menu;
      this.menuV2Service.setMenuSelected(menu);
      if (menu?.url)
        this.setNavigator(menu.url, menu);
    }
  }

  checkMenuSelected(menu: SysMenu, level: number) { // menu = '00.99.99' level = 2, itemSelected = '00.99.92' 
    const arrayMenu = menu.menuid?.split('.') ?? [];
    const menuSelected = this.itemSelected.menuid?.split('.') ?? [];

    for (let i = 0; i <= level; i++) {
      if (i <= menuSelected.length) {
        if (arrayMenu[i] != menuSelected[i]!) {
          return false;
        }
      }
    }
    return true;
  }

  getMenuChildren(menu: SysMenu) {
    return this.InputMaster.filter(x => x.menuIDParent == menu.menuid);
  }

}
