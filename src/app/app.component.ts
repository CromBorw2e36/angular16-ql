import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { SysLoginService } from './system/service/sys-login/sys-login.service';
import { ConfigServerService } from './system/server/config/config-server.service';
import { AccountsClient, SysMenu } from './system/server/api_share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'my-app-2';
  isLogin: Observable<boolean | undefined>;
  accountsClient: AccountsClient;

  constructor(
    private router: Router,
    private sysLogin: SysLoginService,
    private httpClient: HttpClient,
    private configServerService: ConfigServerService
  ) {
    this.accountsClient = new AccountsClient(
      this.httpClient,
      this.configServerService.BASE_URL_SERVER
    );
    this.isLogin = new Observable(undefined);

    try {
      // this.accountsClient.checkTheExpirationDateOfToken().subscribe(
      //   res => {
      //     this.sysLogin.setLogin(res);
      //     this.isLogin = this.sysLogin.checkIsLogin();
      //   },
      //   error => {
      //     this.sysLogin.setLogin(false);
      //   }); // check token
      this.sysLogin.setLogin(false);
      this.isLogin = this.sysLogin.checkIsLogin();
    } catch {}
  }
  ngOnChanges(changes: SimpleChanges): void {}

  async ngOnInit() {}

  async onNavigationCurrent(params: SysMenu) {
    this.router.navigate([params.url]);
    console.log(params);
  }
}
