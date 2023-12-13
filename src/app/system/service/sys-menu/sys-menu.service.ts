import { Injectable } from '@angular/core';
import { SysMenu } from '../../server/api_share';

export interface IGenericMenu {
  parent: SysMenu; //level 1
  child?: IGenericMenuChild2[];
}

export interface IGenericMenuChild2 {
  parent: SysMenu; //level 2
  child: SysMenu[]; //level 3
}

@Injectable({
  providedIn: 'root',
})
export class SysMenuService {
  constructor() {}

  OutputData: IGenericMenu[] = [];

  // Function to build the menu list as per the desired structure
  buildMenuList(data: SysMenu[]): IGenericMenu[] {
    const topLevelMenus: SysMenu[] = data.filter(
      (menu) => menu.menuIDParent === null
    );
    const menuList: IGenericMenu[] = [];
    topLevelMenus.forEach((menu) => {
      const topLevelMenu: IGenericMenu = {
        parent: menu,
        child: this.buildChildMenus(menu.menuid!, data),
      };
      menuList.push(topLevelMenu);
    });
    menuList.sort((a, b) => {
      const menuidA = a.parent?.menuid!.split('.').join('');
      const menuidB = b.parent?.menuid!.split('.').join('');
      return menuidA.localeCompare(menuidB);
    });
    return menuList;
  }

  private buildChildMenus(
    parentMenuId: string,
    data: SysMenu[]
  ): IGenericMenuChild2[] {
    const childMenus: SysMenu[] = data.filter(
      (menu) => menu.menuIDParent === parentMenuId
    );
    const childMenuList: IGenericMenuChild2[] = [];

    childMenus.forEach((menu) => {
      const childMenu: IGenericMenuChild2 = {
        parent: menu,
        child: data.filter((child) => child.menuIDParent === menu.menuid),
      };
      childMenuList.push(childMenu);
    });

    return childMenuList;
  }
}
