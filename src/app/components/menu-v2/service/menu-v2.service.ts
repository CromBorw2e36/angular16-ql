import { Injectable } from '@angular/core';
import { Sys_Menu_Tree_View_MODEL } from 'src/app/system/server/api_share';

@Injectable({
  providedIn: 'root'
})
export class MenuV2Service {

  constructor() {
    this.itemSelectedMenu = JSON.parse(sessionStorage.getItem('MenuV2Service_itemSelectedMenu') ?? "{}");

  }

  itemSelectedMenuLv1: Sys_Menu_Tree_View_MODEL = new Sys_Menu_Tree_View_MODEL();
  itemSelectedMenuLv2: Sys_Menu_Tree_View_MODEL = new Sys_Menu_Tree_View_MODEL();
  itemSelectedMenuLv3: Sys_Menu_Tree_View_MODEL = new Sys_Menu_Tree_View_MODEL();
  itemSelectedMenu: Sys_Menu_Tree_View_MODEL = new Sys_Menu_Tree_View_MODEL();

  regexLevel1 = /^\d{2}\.00\.00$/;
  regexLevel2 = /^\d{2}\.\d{2}\.00$/;
  regexLevel3 = /^\d{2}\.\d{2}\.\d{2}$/;

  setMenuSelected(p: Sys_Menu_Tree_View_MODEL) {
    if (this.regexLevel1.test(p.menuid!)) {
      this.itemSelectedMenuLv1 = p;
      this.setItemSelectedLV('1', p)
    } else if (this.regexLevel2.test(p.menuid!)) {
      this.itemSelectedMenuLv2 = p;
      this.setItemSelectedLV('2', p)
    } else if (this.regexLevel3.test(p.menuid!)) {
      this.itemSelectedMenuLv3 = p;
      this.setItemSelectedLV('3', p)
    }

    this.setMenuSelected_2(p);
  }

  // get theo level 1 2 ở tree view
  getMenuSelected(): Sys_Menu_Tree_View_MODEL {
    return this.setItemSelected();
  }

  getMenuSelectedByLv(lv: string): Sys_Menu_Tree_View_MODEL {
    return this.setItemSelectedLV(lv);
  }


  protected setMenuSelected_2(p: Sys_Menu_Tree_View_MODEL) {
    this.itemSelectedMenu = p;
    try {
      sessionStorage.removeItem('MenuV2Service_itemSelectedMenu');
    } catch { }
    sessionStorage.setItem('MenuV2Service_itemSelectedMenu', JSON.stringify(p));
  }

  //set theo level 1 2 ở tree view
  protected setItemSelected(p?: Sys_Menu_Tree_View_MODEL | undefined) {
    if (p) {
      try {
        sessionStorage.removeItem('MenuV2Service_itemSelectedSave');
      } catch { }
      sessionStorage.setItem('MenuV2Service_itemSelectedSave', JSON.stringify(p));
      return p;
    } else {
      const obj: Sys_Menu_Tree_View_MODEL = JSON.parse(sessionStorage.getItem('MenuV2Service_itemSelectedSave') ?? '{}');
      return obj;
    }
  }

  // set theo level
  protected setItemSelectedLV(level: string, p?: Sys_Menu_Tree_View_MODEL | undefined) {
    if (p) {
      if (level === '1' || level === '2') {
        this.setItemSelected(p);
      }

      // Xóa dữ liệu cũ
      switch (level) {
        case '1':
          try {
            sessionStorage.removeItem(`menuV2Service_save_menu_selected_level_${2}`);
            sessionStorage.removeItem(`menuV2Service_save_menu_selected_level_${3}`);
          } catch { }
          break;
        case '2':
          try {
            sessionStorage.removeItem(`menuV2Service_save_menu_selected_level_${3}`);
          } catch { }
          break;
        default:
          break;
      }

      try {
        sessionStorage.removeItem(`menuV2Service_save_menu_selected_level_${level}`);
      } catch { }

      sessionStorage.setItem(`menuV2Service_save_menu_selected_level_${level}`, JSON.stringify(p));
      return p;
    } else {
      const obj: Sys_Menu_Tree_View_MODEL = JSON.parse(sessionStorage.getItem(`menuV2Service_save_menu_selected_level_${level}`) ?? '{}');
      return obj;
    }
  }
}
