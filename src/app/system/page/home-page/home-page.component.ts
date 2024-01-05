import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Account,
  MenuPermissionsClient,
  SysMenu,
  UserInfo,
} from '../../server/api_share';
import {
  IGenericMenu,
  SysMenuService,
} from '../../service/sys-menu/sys-menu.service';
import { ConfigServerService } from '../../server/config/config-server.service';
import { SysLoginService } from '../../service/sys-login/sys-login.service';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { MenuComponent } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends LayoutComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private sysLoginService: SysLoginService,
    private httpClient: HttpClient,
    private configServerService: ConfigServerService,
    private _sysMenuService: SysMenuService,
    private menuPermissionsClient: MenuPermissionsClient
  ) {
    super(injector);
    this.menuPermissions = [];
    this.userInfo = this.getUserInfo() as UserInfo;
  }

  menuPermissions: IGenericMenu[];
  loading: boolean = false;
  showFiller = true;
  userInfo: UserInfo = new UserInfo();
  avatar: string = '../../../assets/image/avatar-default.png';
  ngOnInit(): void {
    this.loading = true;
    this.menuPermissionsClient.getListMenu().subscribe(
      (res) => {
        this.setListMenu(res);
        const newRes: IGenericMenu[] = this._sysMenuService.buildMenuList(res);
        this.menuPermissions = newRes;
      },
      (err) => {
        if (err.status === 401) {
          this.setLogin();
        }
      },
      () => {
        this.loading = false;
      }
    );
    // this.menuPermissions = defautlMenu as any; // run demo
  }
}

// newRes.map(x => {
//   console.log(x.parent);
//   x.child?.map(y => {
//     console.log(y.parent);
//     y.child.map(z => {
//       console.log(z)
//     })
//   })
// })

const defautlMenu = [
  {
    parent: {
      menuid: '01.00.00',
      url: 'dashboard',
      name: 'Dashboard',
      active: true,
      isParent: null,
      menuIDParent: null,
      defaultActive: true,
      moduleApp: 'QUANLINHANSU',
    },
    child: [],
  },
  {
    parent: {
      menuid: '10.00.00',
      url: '',
      name: 'Nhân sự',
      active: true,
      isParent: true,
      menuIDParent: null,
      defaultActive: false,
      moduleApp: 'QUANLINHANSU',
    },
    child: [
      {
        parent: {
          menuid: '10.01.00',
          url: 'nhan-vien',
          name: 'Nhân viên',
          active: true,
          isParent: null,
          menuIDParent: '10.00.00',
          defaultActive: false,
          moduleApp: 'QUANLINHANSU',
        },
        child: [],
      },
    ],
  },
  {
    parent: {
      menuid: '99.00.00',
      url: '',
      name: 'Hệ thống',
      active: true,
      isParent: true,
      menuIDParent: null,
      defaultActive: false,
      moduleApp: 'HETHONG',
    },
    child: [
      {
        parent: {
          menuid: '99.01.00',
          url: 'ql-tai-khoan',
          name: 'Tài khoản',
          active: true,
          isParent: null,
          menuIDParent: '99.00.00',
          defaultActive: false,
          moduleApp: 'HETHONG',
        },
        child: [],
      },
      {
        parent: {
          menuid: '99.10.00',
          url: 'ql-phan-quyen-menu',
          name: 'Phân quyền menu',
          active: true,
          isParent: null,
          menuIDParent: '99.00.00',
          defaultActive: false,
          moduleApp: 'HETHONG',
        },
        child: [],
      },
    ],
  },
];
