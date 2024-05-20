import { Inject, Injectable, Injector } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, Scroll } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Account, SysMenu, Sys_Menu_Tree_View_MODEL, UserInfo } from 'src/app/system/server/api_share';
import { SysLoginService } from 'src/app/system/service/sys-login/sys-login.service';
import notify from 'devextreme/ui/notify';
import { ConfigServerService } from 'src/app/system/server/config/config-server.service';
import { HomePageService } from 'src/app/system/page/home-page/service/home-page.service';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { MenuV2Service } from 'src/app/components/menu-v2/service/menu-v2.service';

interface ICol_Title_Model {
  id: number,
  code?: string,
  name?: string[],
  placeholder?: string[],
  required?: boolean,
}

type messageType = 'error' | 'success' | 'warning' | 'info';
type messagePosition =
  | 'top left'
  | 'top center'
  | 'top right'
  | 'bottom left'
  | 'bottom center'
  | 'bottom right'
  | 'left center'
  | 'center'
  | 'right center';
type messageDirections =
  | 'down-push'
  | 'down-stack'
  | 'up-push'
  | 'up-stack'
  | 'left-push'
  | 'left-stack'
  | 'right-push'
  | 'right-stack';

@Injectable()
export default class LayoutComponentBase {
  router: Router;
  cookieService: CookieService;
  expireTime: Date = moment().clone().add(12, 'hours').toDate();
  loginService: SysLoginService;
  listMenu: SysMenu[];
  configService: ConfigServerService;
  sysLoginService: SysLoginService;
  title_website: string = this.translate('Quản trị doanh nghiệp', '2K')
  col_title: ICol_Title_Model[] = _col_title;
  route: ActivatedRoute;
  _menuV2Service: MenuV2Service;

  _tableName: string = '';
  _urlVoucherFormEdit: string = ''; // URL Voucher Form Edit - Set value in router-outlet

  constructor(
    injector: Injector,
  ) {
    this.router = injector.get(Router);
    this.cookieService = injector.get(CookieService);
    this.loginService = injector.get(SysLoginService);
    this.listMenu = [];
    this.configService = injector.get(ConfigServerService);
    this.sysLoginService = injector.get(SysLoginService);
    this.route = injector.get(ActivatedRoute);
    this._menuV2Service = injector.get(MenuV2Service);

    // document.title = this.title_website

    this.route.data.subscribe(data => {
      this._tableName = data['table_name'];
      this._urlVoucherFormEdit = data['url_voucher_form_edit'];
    });

    (this.router as Router).events.subscribe(event => {
      if (event instanceof Scroll) {
        const data2 = this._menuV2Service.getMenuSelected();
        this.setTitleWebsite(this.translate(data2?.nameVN, data2?.name), true);
      }

    })
  }

  translate(
    message_vn: string | undefined,
    message_other: string | undefined
  ): string {
    const languageUser = (this.getUserInfo() as Account).language;
    switch (languageUser) {
      case "vi-VN":
        return message_vn ?? "";
      case "ORTHER":
        return message_other ?? "";
      default:
        return message_vn ?? "";
    }
  }

  setNavigator(url: string = '', data: any = undefined) {
    if (data) {
      sessionStorage.removeItem('navigatorMenu');
      sessionStorage.setItem('navigatorMenu', JSON.stringify(data));
    }
    try {
      if (url?.length > 0) {
        this.router.navigate([url]);
      }
    } catch (e) {
      this.router.navigate(['page-not-found']);
    }
  }

  setRouter(url: string, data: any, action_type?: string) {
    try {
      if (url?.length > 0) {
        const obj = {
          data: data,
          action_type: action_type,
        }
        this.router.navigate([url], { state: { data: obj } });
      }
    } catch (e) {
      this.router.navigate(['page-not-found']);
    }
  }

  getRouterState<T>() {
    const state = window.history.state;
    return state?.data as { data: T, action_type?: Action_Type_Enum } | undefined;
  }

  setLogin(status: boolean = false) {
    this.loginService.setLogin(status);
  }

  public setTitleWebsite(text: string, replace: boolean = false) {
    if (replace) {
      document.title = text;
    } else {
      document.title = `${this.title_website}${text.length > 0 ? ' - ' : ''}${text}`
    }
  }

  public setLstMenu(p: SysMenu[]) {
    this.listMenu = p;
    sessionStorage.removeItem('listMenu');
    sessionStorage.setItem('listMenu', JSON.stringify(p));
  }

  public setUserInfo(p: any) {
    const data = this.getUserInfo();
    if (data) sessionStorage.removeItem('user_info');
    sessionStorage.setItem('user_info', JSON.stringify(p));
  }

  public getUserInfo() {
    try {
      const userInfo = JSON.parse(sessionStorage.getItem('user_info') ?? "{}") as any;
      return userInfo as Account | UserInfo | any;
    } catch {
      return {} as Account | UserInfo | any;
    }
  }

  public getLstMenu(): Sys_Menu_Tree_View_MODEL[] {
    return JSON.parse(sessionStorage.getItem('listMenu') ?? '[]');
    // return this.listMenu;
  }

  public setListMenuLevel3(p: Sys_Menu_Tree_View_MODEL[]) {
    sessionStorage.removeItem('listMenuLV3');
    sessionStorage.setItem('listMenuLV3', JSON.stringify(p));
  }

  public getListMenuLevel3(): Sys_Menu_Tree_View_MODEL[] {
    return JSON.parse(sessionStorage.getItem('listMenuLV3') ?? '[]');
  }

  public getMenuSelected(): Sys_Menu_Tree_View_MODEL {
    return JSON.parse(sessionStorage.getItem('navigatorMenu') ?? '{}');
  }

  public showMessageSuccess(msg: string = '') {
    this.showMessage('success', msg, 1500);
  }

  public showMessageError(msg: string = '') {
    this.showMessage('error', msg, 3000);
  }

  public showMessageWarning(msg: string = '') {
    this.showMessage('warning', msg, 4000);
  }

  public showMessageInfo(msg: string = '') {
    this.showMessage('info', msg, 4000);
  }

  private showMessage(
    type: messageType,
    msg: string = '',
    time: number = 3000,
    position: messagePosition = 'top right',
    direction: messageDirections = 'down-push'
  ) {
    notify(
      {
        message: msg,
        height: 'auto',
        width: 250,
        minWidth: 150,
        type: type,
        displayTime: time,
        animation: {
          show: {
            type: 'fade',
            duration: 400,
            from: 0,
            to: 1,
          },
          hide: { type: 'fade', duration: 40, to: 0 },
        },
      },
      { position, direction }
    );
  }

  public setLogout() {
    this.cookieService.delete('TOKEN');
    this.sysLoginService.setLogin(false);
  }

  public Authorization() {
    this.setLogout();
  }

  formatDateString(datetime: Date | undefined): string {
    return datetime ? moment(datetime).format('DD/MM/yyyy') : '01/01/2000';
  }
  formatDateTimeString(datetime: Date | undefined): string {
    return datetime ? moment(datetime).format('DD/MM/yyyy HH:mm') : '01/01/2000 00:00';
  }

  formatDateFromNow(date: Date | undefined): string {
    moment.locale(this.translate('vi', 'us'))
    return date ? moment(date).fromNow() : '';
  }

  trackByFunc(index: number, data: any) {
    return index;
  }

  get_col_title_by_id(id: number): ICol_Title_Model {
    return this.col_title.find(x => x.id == id)!;
  }

  showCursorLoading(res: boolean = false) {
    if (res) {
      document.body.classList.add('cursor-wait')
    } else {
      document.body.classList.remove('cursor-wait')
    }
  }

  setLoadingComponent(res: boolean = false) {
    this.showCursorLoading(res);
  }

  random_key_string(length: number = 20): string {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_abcdefghijklmnopqrstuvwxyz01234";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getRouteData(route: ActivatedRoute): any {
    const routeSnapshot = route.snapshot;
    const routeData = routeSnapshot.data;
    return routeData;
  }

}


const _col_title: ICol_Title_Model[] = [
  {
    id: 1,
    code: undefined,
    name: ['Ẩnh đại diện hệ thống', 'Background image'],
    placeholder: undefined,
    required: false,
  }, {
    id: 2,
    code: "TITLE_ACCOUNT",
    name: ['Tài khoản/Email', 'Account/Email'],
    placeholder: undefined,
    required: false,
  }, {
    id: 3,
    code: "TITLE_PASSWORD",
    name: ['Mật khẩu', 'Password'],
    placeholder: undefined,
    required: false,
  }, {
    id: 4,
    code: "TITLE_LOGIN",
    name: ['Đăng nhập', 'Sign In'],
    placeholder: undefined,
    required: false,
  }, {
    id: 5,
    code: "",
    name: ['Trở thành thành viên', 'Become a member'],
    placeholder: undefined,
    required: false,
  }, {
    id: 6,
    code: "",
    name: ['Dùng thử miễn phí?', 'Free trail?'],
    placeholder: undefined,
    required: false,
  }, {
    id: 7,
    code: "",
    name: ['Đăng ký?', 'Sign Up'],
    placeholder: undefined,
    required: false,
  }, {
    id: 8,
    code: "",
    name: ['ERP-12/23 - Phiên bản thử nghiệm 0.1', 'ERP-12/23 - Version beta 0.1'],
    placeholder: undefined,
    required: false,
  },
]