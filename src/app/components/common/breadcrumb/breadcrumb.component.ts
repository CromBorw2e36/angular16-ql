import { Component, Injector } from '@angular/core';
import { MenuV2Service } from '../../menu-v2/service/menu-v2.service';
import { Sys_Menu_Tree_View_MODEL } from 'src/app/system/server/api_share';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';

@Component({
  selector: 'breadcrumb-component',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent extends LayoutComponentBase {
  constructor(
    private menuV2Service: MenuV2Service,
    injector: Injector,
  ) {
    super(injector);
  }

  get getListMenu() {
    const arr: Array<Sys_Menu_Tree_View_MODEL> = []
    // if (this.menuV2Service.getMenuSelectedByLv('1')) arr.push(this.menuV2Service.itemSelectedMenuLv1)
    if (this.menuV2Service.getMenuSelectedByLv('2')) arr.push(this.menuV2Service.itemSelectedMenuLv2)
    if (this.menuV2Service.getMenuSelectedByLv('3')) arr.push(this.menuV2Service.itemSelectedMenuLv3)
    // console.log(arr)
    return arr;
  }

  handleClickMenu(p: Sys_Menu_Tree_View_MODEL) {
    this.setNavigator(p.url)
  }
}
