import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Injector,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SysLoginService } from './system/service/sys-login/sys-login.service';
import { ConfigServerService } from './system/server/config/config-server.service';
import { AccountsClient, SysMenu } from './system/server/api_share';
import LayoutComponentBase from './share/layoutBase/LayoutComponentBase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent
  extends LayoutComponentBase
  implements OnInit, OnChanges
{
  title = 'my-app-2';
  isLogin: Observable<boolean | undefined> ;
  constructor(
    injector: Injector,
    private sysLogin: SysLoginService,
    private httpClient: HttpClient,
    private accountsClient: AccountsClient
  ) {
    super(injector);
    this.isLogin = new Observable(undefined);

    try {
      this.accountsClient.checkTheExpirationDateOfToken().subscribe(
        (res) => {
          this.sysLogin.setLogin(res);
          this.isLogin = this.sysLogin.checkIsLogin();
        },
        (error) => {
          this.sysLogin.setLogin(false);
        }
      ); // check token
      // this.sysLogin.setLogin(true); // run demo
      this.isLogin = this.sysLogin.checkIsLogin();
    } catch {
      this.sysLogin.setLogin(false);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {}

  async ngOnInit() {}

  async onNavigationCurrent(params: SysMenu) {
    this.router.navigate([params.url]);
    console.log(params);
  }
}
