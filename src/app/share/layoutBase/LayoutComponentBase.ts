import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Account, SysMenu, UserInfo } from 'src/app/system/server/api_share';
import { SysLoginService } from 'src/app/system/service/sys-login/sys-login.service';
import notify from 'devextreme/ui/notify';
import { ConfigServerService } from 'src/app/system/server/config/config-server.service';

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
  configService: ConfigServerService
  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.cookieService = injector.get(CookieService);
    this.loginService = injector.get(SysLoginService);
    this.listMenu = [];
    this.configService = injector.get(ConfigServerService);
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
    if (url) {
      this.router.navigate([url]);
    }
  }

  setLogin(status: boolean = false) {
    this.loginService.setLogin(status);
  }

  public setListMenu(p: SysMenu[]) {
    this.listMenu = p;
  }

  public getUserInfo() {
    const userInfo = JSON.parse(
      localStorage.getItem('userInfo') ?? '{}'
    ) as any;
    return userInfo as UserInfo | Account;
  }

  public getLstMenu() {
    return this.listMenu;
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
}
