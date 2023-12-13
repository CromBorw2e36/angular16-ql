import { Injectable } from '@angular/core';
import { SysLoginService } from '../../service/sys-login/sys-login.service';

@Injectable()
export class HttpContext {
    Token: string;
    constructor(private loginS: SysLoginService) {
        this.Token = loginS.getToken();
    }
}
