import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SessionStorageServiceService } from '../../service/session-storage/session-storage-service.service';
import { Router } from '@angular/router';
import { SysLoginService } from '../../service/sys-login/sys-login.service';
import { ConfigServerService } from '../../server/config/config-server.service';
import { Account, AccountsClient } from '../../server/api_share';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent
  extends LayoutComponentBase
  implements OnInit, OnChanges
{
  constructor(
    private sessionData: SessionStorageServiceService,
    private _router: Router,
    private sysLogin: SysLoginService,
    private httpClient: HttpClient,
    private configSv: ConfigServerService
  ) {
    super();
    this.accountsClient = new AccountsClient(
      this.httpClient,
      this.configSv.BASE_URL_SERVER
    );
  }

  accountsClient: AccountsClient;
  InputMaster: Account = new Account();
  loading: boolean = false;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.InputMaster);
  }

  async OnSubmit() {
    this.loading = true;
    this.accountsClient
      .login({
        ...new Account(),
        account: this.InputMaster.account,
        password: this.InputMaster.password,
      } as Account)
      .subscribe((res) => {
        if (res.status) {
          const data: Account = res.data.account as Account;
          this.sessionData.setSessionData('TOKEN', data.token);
          this.sysLogin.setLogin(true); // Đăng nhập thành công
        } else {
          console.log('Đăng nhập thất bại');
        }
        this.loading = false;
      });
  }

  async onSignUp() {
    this._router.navigate(['']); // đăng kí tài khoản
  }

  inValid(text: string | undefined) {
    return text === undefined;
  }
}
