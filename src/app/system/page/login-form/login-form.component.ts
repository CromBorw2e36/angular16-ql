import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  Component,
  OnInit,
  Inject,
  OnChanges,
  SimpleChanges,
  Injector,
} from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SessionStorageServiceService } from '../../service/session-storage/session-storage-service.service';
import { Router } from '@angular/router';
import { SysLoginService } from '../../service/sys-login/sys-login.service';
import { ConfigServerService } from '../../server/config/config-server.service';
import { Account, AccountsClient, UserInfo } from '../../server/api_share';
import * as moment from 'moment';

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
    injector: Injector,
    private sessionData: SessionStorageServiceService,
    private _router: Router,
    private sysLogin: SysLoginService,
    private httpClient: HttpClient,
    private configSv: ConfigServerService,
    private accountsClient: AccountsClient
  ) {
    super(injector);
  }
  InputMaster: Account = new Account();
  loading: boolean = false;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.InputMaster);
  }

  async OnSubmit() {
    if (!this.InputMaster.account) {
      this.showMessageWarning(
        this.translate('Vui lòng nhập tài khoản', 'Plaese enter your account')
      );
    } else if (!this.InputMaster.password) {
      this.showMessageWarning(
        this.translate('Vui lòng nhập mật khẩu', 'Plaese enter your password')
      );
    } else {
      this.loading = true;
      this.accountsClient
        .login({
          ...new Account(),
          account: this.InputMaster.account,
          password: this.InputMaster.password,
        } as Account)
        .subscribe(
          (res) => {
            if (res.status) {
              const data: Account = res.data.account as Account;
              const user: UserInfo = res.data.user as UserInfo;
              this.cookieService.set(
                'TOKEN',
                data.token ?? '',
                this.expireTime
              );
              localStorage.removeItem('userInfo');
              localStorage.setItem(
                'userInfo',
                JSON.stringify({ ...data, ...user })
              );
              this.sysLogin.setLogin(true); // Đăng nhập thành công
              this.showMessageSuccess(res.message);
            } else {
              this.showMessageError(res.message);
            }
          },
          (err) => {
            this.showMessageError(
              this.translate(
                'Vui lòng kiểm tra kết nối mạng',
                'Try connect again'
              )
            );
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
    }
  }

  async onSignUp() {
    this._router.navigate(['']); // đăng kí tài khoản
  }

  inValid(text: string | undefined) {
    return text === undefined;
  }
}
