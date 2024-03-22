import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Account, SysMenu, UserInfo } from 'src/app/system/server/api_share';
import { SysLoginService } from 'src/app/system/service/sys-login/sys-login.service';
import notify from 'devextreme/ui/notify';
import { ConfigServerService } from 'src/app/system/server/config/config-server.service';

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
  title_website: string = this.translate('Quản lí doanh nghiệp', '2K')
  col_title: ICol_Title_Model[] = _col_title;


  constructor(
    injector: Injector,
  ) {
    this.router = injector.get(Router);
    this.cookieService = injector.get(CookieService);
    this.loginService = injector.get(SysLoginService);
    this.listMenu = [];
    this.configService = injector.get(ConfigServerService);
    this.sysLoginService = injector.get(SysLoginService);
    document.title = this.title_website
  }

  translate(
    message_vn: string | undefined,
    message_other: string | undefined
  ): string {
    return message_vn ? message_vn : '';
  }

  setNavigator(url: string = '', data: any = undefined) {
    if (data) {
      sessionStorage.removeItem('navigatorMenu');
      sessionStorage.setItem('navigatorMenu', JSON.stringify(data));
    }
    this.router.navigate([url]);
  }

  setLogin(status: boolean = false) {
    this.loginService.setLogin(status);
  }

  public setTitleWebsite(text: string, replace: boolean = false) {
    !replace ? document.title = `${this.title_website}${text.length > 0 ? '-' : ''}${text}`
      : document.title = text;
  }

  public setLstMenu(p: SysMenu[]) {
    this.listMenu = p;
    sessionStorage.removeItem('listMenu');
    sessionStorage.setItem('listMenu', JSON.stringify(p));
  }

  public getUserInfo() {
    const userInfo = JSON.parse(
      localStorage.getItem('userInfo') ?? '{}'
    ) as any;
    return userInfo as UserInfo | Account;
  }

  public getLstMenu(): SysMenu[] {
    return JSON.parse(sessionStorage.getItem('listMenu') ?? '[]');
    // return this.listMenu;
  }

  public setListMenuLevel3(p: SysMenu[]) {
    sessionStorage.removeItem('listMenuLV3');
    sessionStorage.setItem('listMenuLV3', JSON.stringify(p));
  }

  public getListMenuLevel3(): SysMenu[] {
    return JSON.parse(sessionStorage.getItem('listMenuLV3') ?? '[]');
  }

  public getMenuSelected(): SysMenu {
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

  formatDateString(datetime: Date | undefined): string {
    return datetime ? moment(datetime).format('DD/MM/yyyy') : '';
  }
  formatDateTimeString(datetime: Date | undefined): string {
    return datetime ? moment(datetime).format('DD/MM/yyyy HH:mm') : '';
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