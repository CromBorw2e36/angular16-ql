import { Injectable } from '@angular/core';
import { SysLoginService } from '../../service/sys-login/sys-login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HttpContext {
  Token: string;
  constructor(private loginS: SysLoginService, cookieService: CookieService) {
    // this.Token = loginS.getToken();
    this.Token = cookieService.get('TOKEN');
  }
}
