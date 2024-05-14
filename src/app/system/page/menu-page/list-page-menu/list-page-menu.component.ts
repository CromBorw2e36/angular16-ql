import { Component, Injector, OnInit } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { MenuPermissionsClient, SysMenu, Sys_Menu_Tree_View_MODEL, Account, API_BASE_URL } from 'src/app/system/server/api_share';
import { SysMenuService } from 'src/app/system/service/sys-menu/sys-menu.service';
import { HomePageService } from '../../home-page/service/home-page.service';
import { NavigationEnd, NavigationSkipped, Router, Scroll } from '@angular/router';
import { MenuV2Service } from 'src/app/components/menu-v2/service/menu-v2.service';

@Component({
  selector: 'list-page-menu-component',
  templateUrl: './list-page-menu.component.html',
  styleUrls: ['./list-page-menu.component.scss']
})
export class ListPageMenuComponent extends LayoutComponentBase implements OnInit {


  constructor(
    private menuPermissionsClient: MenuPermissionsClient,
    private homePageService: HomePageService,
    injector: Injector,
    router: Router,
    private menuV2Service: MenuV2Service
  ) {
    super(injector);
    this.InputMaster = [];

    this.router.events.subscribe(x => {
      if (x instanceof Scroll && x.routerEvent.url === '/menu') {
        this.onLoadMenu();
        this.itemSelected = this.menuV2Service.itemSelectedMenuLv2;
      }
    })

  }

  itemSelected: Sys_Menu_Tree_View_MODEL = new Sys_Menu_Tree_View_MODEL();

  InputMaster: Array<SysMenu>;

  ngOnInit(): void {
    this.onLoadMenu();
  }

  onLoadMenu() {
    const obj = this.menuV2Service.itemSelectedMenuLv2;
    console.log("I see menu selected is: ", obj.menuid!);
    if (obj) {
      this.homePageService.setLoading(true);
      obj.account = this.getUserInfo().id as string;
      this.menuPermissionsClient.listMenuById(obj).subscribe(x => {
        this.InputMaster = x;
        this.homePageService.setLoading(false);
      });
    } else {
      this.setNavigator("**")
    }
  }

  GenValue(p: any) {
    return p ?? "";
  }

  GentItemIcon(p: Sys_Menu_Tree_View_MODEL | any) {
    return p?.icon ? API_BASE_URL.toString() + '../../../../../assets/icons/' + p?.icon : '../../../../../assets/icons/application.png'
  }

  onLoadImageError(ev: any) {
    ev.target.src = '../../../../../assets/icons/application.png';
  }

  handleItemClick(p: Sys_Menu_Tree_View_MODEL) {
    this.setNavigator(p.url, p);
    this.itemSelected = p;
    this.menuV2Service.setMenuSelected(p);
  }

}
