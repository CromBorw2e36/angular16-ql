import { Component, Injector, OnInit } from '@angular/core';
import LayoutComponentBase from '../../layoutBase/LayoutComponentBase';
import { Account, AccountsClient, Company, UserInfo, UserInfoesClient, UserInformationClientGetUser } from 'src/app/system/server/api_share';

@Component({
  selector: 'ql-tai-khoan',
  templateUrl: './ql-tai-khoan.component.html',
  styleUrls: ['./ql-tai-khoan.component.scss']
})
export class QlTaiKhoanComponent extends LayoutComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private userInfoesClient: UserInfoesClient,
    private accountsClient: AccountsClient
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.loadDataSource();
  }

  userInformation: UserInformationClientGetUser = new UserInformationClientGetUser();
  accountInformation: Account = new Account();


  loadDataSource() {
    this.userInfoesClient.getUserInformation().subscribe(x => this.userInformation = x,
      (err) => { if (err.status === 401) this.setLogin(false) });
  }

  renderValue(value?: any) {
    return value ?? ''
  }


  
}
