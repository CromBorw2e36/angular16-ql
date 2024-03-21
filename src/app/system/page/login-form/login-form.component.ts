import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Injector,
  ViewChild,
  ElementRef,
} from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SessionStorageServiceService } from '../../service/session-storage/session-storage-service.service';
import { Router } from '@angular/router';
import { SysLoginService } from '../../service/sys-login/sys-login.service';
import { Account, AccountClientLoginParamsModel, AccountClientProfileModel, AccountsClient, UserInfo } from '../../server/api_share';
import { DeviceDetectorService } from 'ngx-device-detector';
import { typeOfSwitchLogin } from '../common/type-of-variable';
import * as moment from 'moment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent
  extends LayoutComponentBase
  implements OnInit, OnChanges {
  constructor(
    injector: Injector,
    private sessionData: SessionStorageServiceService,
    private _router: Router,
    private sysLogin: SysLoginService,
    private accountsClient: AccountsClient,
    private deviceDetectorService: DeviceDetectorService
  ) {
    super(injector);

    this.loading = false;
    this.InputMaster = new AccountClientLoginParamsModel();
    this.isSwitchLogin = this.sysLogin.getIsTypeSwitchLogin();
  }
  InputMaster: AccountClientLoginParamsModel;
  loading: boolean;
  isSwitchLogin: typeOfSwitchLogin;
  @ViewChild('login100FromAbsoluteImageEvent_00') login100FromAbsoluteImageEvent_00?: ElementRef<HTMLImageElement> = undefined;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.InputMaster);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelector('login100-form-absolute-image-event_000')?.classList.remove('d-none')
      if (this.login100FromAbsoluteImageEvent_00) {
        this.login100FromAbsoluteImageEvent_00.nativeElement.classList.remove('d-none')
        if (moment().diff(moment('02/20/2024').toDate(), 'hour') < 10 * 24) {
          this.login100FromAbsoluteImageEvent_00.nativeElement.src = 'https://img.freepik.com/free-vector/flat-tet-vietnamese-new-year_23-2148790657.jpg?w=740&t=st=1708398796~exp=1708399396~hmac=8a13ae1f47b1683efbe427e336c741bf9fa53667380ec66a547f5d04bf387613';
        }
        else if (moment().diff(moment('04/18/2024').toDate(), 'hour') < 1 * 24) {
          this.login100FromAbsoluteImageEvent_00.nativeElement.src = 'https://img.freepik.com/free-vector/flat-tet-vietnamese-new-year_23-2148790657.jpg?w=740&t=st=1708398796~exp=1708399396~hmac=8a13ae1f47b1683efbe427e336c741bf9fa53667380ec66a547f5d04bf387613';
        }
        else {
          this.login100FromAbsoluteImageEvent_00.nativeElement.classList.add('d-none')
        }
      }
    }, 500)
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.InputMaster.latitude = position.coords.latitude;
          this.InputMaster.longitude = position.coords.longitude;
        },
        (error) => {
          this.InputMaster.latitude = undefined;
          this.InputMaster.longitude = undefined;
        }
      );
    } else {
      this.InputMaster.latitude = undefined;
      this.InputMaster.longitude = undefined;
    }
  }

  OnSubmit() {
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
      this.InputMaster.type_device = this.deviceDetectorService.deviceType;
      this.InputMaster.os = this.deviceDetectorService.os;
      this.InputMaster.browser = this.deviceDetectorService.browser;
      this.InputMaster.browser_version =
        this.deviceDetectorService.browser_version;
      this.InputMaster.device = this.deviceDetectorService.device;
      this.InputMaster.os_version = this.deviceDetectorService.os_version;
      this.InputMaster.is_mobile = this.deviceDetectorService.isMobile();
      this.InputMaster.is_tablet = this.deviceDetectorService.isTablet();
      this.InputMaster.is_desktop = this.deviceDetectorService.isTablet();
      this.InputMaster.is_android = this.deviceDetectorService.isTablet();
      this.InputMaster.is_ios = this.deviceDetectorService.isTablet();

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.InputMaster.latitude = position.coords.latitude;
            this.InputMaster.longitude = position.coords.longitude;
            this.handleLogin();
          },
          (error) => {
            this.InputMaster.latitude = undefined;
            this.InputMaster.longitude = undefined;
            this.handleLogin();
          }
        );
      } else {
        this.InputMaster.latitude = undefined;
        this.InputMaster.longitude = undefined;
        this.handleLogin();
      }
    }
  }

  handleLogin() {
    this.accountsClient
      .login({
        ...new Account(),
        ...this.InputMaster,
      } as Account)
      .subscribe(
        (res) => {
          if (res.status) {
            const data: Account = res.data.account as Account;
            const user: UserInfo = res.data.user as UserInfo;
            this.cookieService.set('TOKEN', data.token ?? '', this.expireTime);
            localStorage.removeItem('userInfo');
            this.sysLogin.removeIsTypeSwitchLogin();
            localStorage.setItem('userInfo', JSON.stringify({ ...data, ...user }));
            this.sysLogin.setLogin(true); // Đăng nhập thành công
            this.showMessageSuccess(res.msg);
          } else {
            this.showMessageError(res.msg);
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

  onSignUp() {
    this.isSwitchLogin = 'REGISTER';
    this.sysLogin.setIsTypeSwitchLogin(this.isSwitchLogin);
  }

  onBackLogin() {
    this.isSwitchLogin = 'LOGIN';
    this.sysLogin.setIsTypeSwitchLogin(this.isSwitchLogin);
  }

  inValid(text: string | undefined) {
    return text === undefined;
  }

  loadingImageError() {
    document.querySelector('#login-image-background')?.classList.add('d-none');
    
  }
}
