import { Component, Injector, OnInit } from '@angular/core';
import LayoutComponentBase from '../../layoutBase/LayoutComponentBase';
import { Account, AccountsClient, Company, UserInfo, UserInfoesClient, UserInformationClientGetUser } from 'src/app/system/server/api_share';
import { HomePageService } from 'src/app/system/page/home-page/service/home-page.service';

@Component({
  selector: 'ql-tai-khoan',
  templateUrl: './ql-tai-khoan.component.html',
  styleUrls: ['./ql-tai-khoan.component.scss']
})
export class QlTaiKhoanComponent extends LayoutComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private userInfoesClient: UserInfoesClient,
    private accountsClient: AccountsClient,
    private homepageService: HomePageService,

  ) {
    super(injector);
  }

  userInformation: UserInformationClientGetUser = new UserInformationClientGetUser();
  accountInformation: Account = new Account();
  isLoading: boolean = false;

  dataFieldSelected: string = '';

  ngOnInit(): void {
    this.loadDataSource();
  }




  loadDataSource() {
    this.isLoading = true;
    this.homepageService.setLoading(true);
    this.userInfoesClient.getUserInformation().subscribe(x => {
      this.userInformation = x;
      this.isLoading = false;
      this.homepageService.setLoading(false);
    },
      (err) => { if (err.status === 401) this.setLogin(false); this.homepageService.setLoading(false); });
  }

  renderValue(value?: any) {
    return value ?? (this.isLoading ? this.translate('Trống', 'Unknown') : '')
  }

  onLoadImageError(ev: any) {
    ev.target.src = '../../../../assets/image/load-image-error.jpg';
  }

}
