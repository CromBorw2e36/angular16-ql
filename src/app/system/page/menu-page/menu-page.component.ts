import { Component, Injector } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { IGenericMenu } from '../../service/sys-menu/sys-menu.service';
import { SysMenu } from '../../server/api_share';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
})
export class MenuPageComponent extends LayoutComponentBase {
  constructor(injector: Injector) {
    super(injector);
  }

  get getListMenu() {
    return this.getListMenuLevel3();
  }
  identifyChild(index: number, item: SysMenu) {
    return item.menuid;
  }
}
