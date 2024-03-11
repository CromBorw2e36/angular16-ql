import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import LayoutComponentBase from '../../share/layoutBase/LayoutComponentBase';
import {
  IGenericMenu,
  IGenericMenuChild2,
} from 'src/app/system/service/sys-menu/sys-menu.service';
import { Router } from '@angular/router';
import { SysMenu } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent
  extends LayoutComponentBase
  implements OnChanges, OnChanges, OnInit {
  constructor(injector: Injector) {
    super(injector);
    this.menuPermissions = [];
  }

  @Input() menuPermissions: IGenericMenu[] = [];

  regexLevel1 = /^\d{2}\.00\.00$/;
  regexLevel2 = /^\d{2}\.\d{2}\.00$/;
  regexLevel3 = /^\d{2}\.\d{2}\.\d{2}$/;

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void { }

  navigator(pMenu: SysMenu): void {
    const url = pMenu?.url;
    console.log(url);
    try {
      this.setNavigator(url, pMenu);
    } catch { }
  }

  identifyFarent(index: number, item: IGenericMenu) {
    return item.parent.menuid;
  }

  identifyChild(index: number, item: IGenericMenuChild2) {
    return item.parent.menuid;
  }

  eventClickMenu(pMenu: SysMenu | undefined, pMenu2: IGenericMenu) {
    if (pMenu && pMenu.menuid) {
      if (this.regexLevel1.test(pMenu.menuid) && pMenu.url) {
        this.navigator(pMenu);
        const menuLv1Class = document.querySelectorAll(`.ct-collapse`);
        const menuLv1 = document.querySelector(`[id="${pMenu.menuid}"]`);
        menuLv1Class.forEach((x) => {
          if (x.classList.contains('active')) {
            x.classList.remove('active');
          }
        });
        if (menuLv1) {
          menuLv1.classList.add('active');
        }
      } else if (this.regexLevel1.test(pMenu.menuid)) {
        const menuLv1 = document.querySelector(`[id="${pMenu.menuid}"]`);
        const menuLv1Class = document.querySelectorAll(
          `[class*="${pMenu.menuid.replaceAll('.', '-')}"]`
        );
        menuLv1Class.forEach((x) => {
          if (x.classList.contains('show')) {
            x.classList.remove('show');
          } else {
            x.classList.add('show');
          }
        });
        if (menuLv1) {
          menuLv1.classList.add('active');
        }
      } else if (this.regexLevel2.test(pMenu.menuid) && pMenu.url) {
        this.navigator(pMenu);
        const menuLv2Class = document.querySelectorAll('.menu-level-2');
        const menuLv2 = document.querySelector(`[id="${pMenu.menuid}"]`);
        menuLv2Class.forEach((element) => {
          element.classList.remove('active');
        });
        if (menuLv2) {
          menuLv2.classList.add('active');
        }
      } else if (this.regexLevel2.test(pMenu.menuid)) {
        const menuLv2Class = document.querySelectorAll('.menu-level-2');
        const menuLv2 = document.querySelector(`[id="${pMenu.menuid}"]`);
        const menuPervertSelect = this.getMenuSelected();
        this.setListMenuLevel3(this.genderListMenu3(pMenu));

        if (menuPervertSelect && menuPervertSelect.menuid) {
          if (
            this.regexLevel1.test(menuPervertSelect.menuid) &&
            menuPervertSelect.url
          ) {
            const menuLv1 = document.querySelector(
              `[id="${menuPervertSelect.menuid}"]`
            );
            if (menuLv1) {
              menuLv1.classList.remove('active');
            }
          }
        }

        this.setNavigator('', pMenu);
        menuLv2Class.forEach((element) => {
          element.classList.remove('active');
        });

        if (menuLv2) {
          menuLv2.classList.add('active');
        }
      } else {
        this.navigator(pMenu);
      }
    }
  }

  genderListMenu3(p: SysMenu) {
    const menuidParent = p.menuid;
    if (menuidParent) {
      const findLastIndex = menuidParent.lastIndexOf('.');
      if (findLastIndex !== -1) {
        const regexMenuid = new RegExp(
          `^${menuidParent.substring(0, findLastIndex)}.\\d{2}$`
        );
        const listMenuFilter = this.getLstMenu().filter((x) =>
          regexMenuid.test(x.menuid ?? '')
        );
        console.log(listMenuFilter);
        console.log(this.getLstMenu());
        return listMenuFilter;
      }
    }
    return [];
  }

  genderListMenu1(p: SysMenu) {
    const menuidParent = p.menuid;
    if (menuidParent) {
      const findLastIndex = menuidParent.indexOf('.');
      if (findLastIndex !== -1) {
        const regexMenuid = new RegExp(
          `^${menuidParent.substring(0, findLastIndex)}.00.00$`
        );
        const listMenuFilter = this.getLstMenu().filter((x) =>
          regexMenuid.test(x.menuid ?? '')
        );
        console.log(listMenuFilter);
        console.log(this.getLstMenu());
        return listMenuFilter;
      }
    }
    return [];
  }
}
