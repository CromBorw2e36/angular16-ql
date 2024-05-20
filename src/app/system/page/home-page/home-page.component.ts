import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Account,
  MenuPermissionsClient,
  SysMenu,
  Sys_Menu_Tree_View_MODEL,
  UserInfo,
} from '../../server/api_share';
import {
  IGenericMenu,
  SysMenuService,
} from '../../service/sys-menu/sys-menu.service';
import { ConfigServerService } from '../../server/config/config-server.service';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { HomePageService } from './service/home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends LayoutComponentBase implements OnInit, OnDestroy {
  constructor(
    injector: Injector,
    private httpClient: HttpClient,
    private configServerService: ConfigServerService,
    private _sysMenuService: SysMenuService,
    private menuPermissionsClient: MenuPermissionsClient,
    private homepageService: HomePageService,
  ) {
    super(injector);
    this.menuPermissions = [];
    this.userInfo = this.getUserInfo() as UserInfo;
  }

  menuPermissions: Sys_Menu_Tree_View_MODEL[];
  showFiller = true;
  userInfo: UserInfo = new UserInfo();
  avatar: string = '../../../assets/image/avatar-default.png';
  is_show_hidden_menu: boolean = true;


  @ViewChild('drawer') drawerComponent: MatDrawer | undefined;


  ngOnInit(): void {
    // this.setTitleWebsite(this.translate('Quản trị', 'management'), true)
    this.homepageService.setLoading(true);

    this.menuPermissionsClient.listMenuTreeView().subscribe(
      (res) => {
        this.setLstMenu(res);
        this.menuPermissions = res;
       },
      (err) => {
        if (err.status === 401) {
          this.setLogin();
        }
      },
      () => {
        this.homepageService.setLoading(false);
      }
    );
  }

  get PageLoading(): boolean {
    return this.homepageService.loading;
  }

  onClickDrawer() {
    this.is_show_hidden_menu = !this.is_show_hidden_menu;
    this.drawerComponent?.toggle(this.is_show_hidden_menu);
  }

  ngOnDestroy(): void {
    alert('Destroy');
  }

  onLogout() {
    this.setLogout();
  }
}
