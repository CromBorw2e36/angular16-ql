import { Location } from '@angular/common';
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { IVoucher_Form_UI, VoucherFormComponent } from 'src/app/components/form/voucher-form/voucher-form/voucher-form.component';
import { Action_Type_Enum, _ACTION_TYPE_CODE } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { Account, AccountClientProfileModel, AccountsClient, UserInfo } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-account-add-edit',
  templateUrl: './account-add-edit.component.html',
  styleUrls: ['./account-add-edit.component.scss']
})
export class AccountAddEditComponent extends LayoutComponentBase implements OnInit, IVoucher_Form_UI, IToolBarComponent {

  constructor(
    injector: Injector,
    private accountClient: AccountsClient,
    private location: Location
  ) {
    super(injector);
  }
  action_type_toolbar: '1' | '2' | '3' | '4' | '5' | '6' | '7' = '2';
  action_type_code = _ACTION_TYPE_CODE;

  InputMaster: AccountClientProfileModel = new AccountClientProfileModel();
  InputMaster_UserInfo: UserInfo = new UserInfo();
  InputMaster_Account: Account = new Account();
  InputMaster_AccountChangePassword: Account = new Account();

  action_type: Action_Type_Enum | undefined

  @Input() dataFilter: AccountClientProfileModel = new AccountClientProfileModel();

  @ViewChild('voucherFormComponent') voucherFormComponent: VoucherFormComponent | undefined;

  ngOnInit(): void {
    const state = this.getRouterState<AccountClientProfileModel>();
    //console.log(state)

    if (state) {
      this.action_type = state?.action_type;
      switch (this.action_type) {
        case Action_Type_Enum.ADD: {
          this.onInitActionAdd();
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  onInitActionAdd() {
    this.InputMaster = new AccountClientProfileModel();
  }

  ValueChangedEventVoucherForm(event: any): void {

  }

  onLoadData(model: Account) {

    this.accountClient.accountSearch(model).subscribe(res => {
      if (res.status == 0) {
        if (res.data) {
          this.InputMaster = res.data!;
          this.InputMaster_UserInfo = res.data!.userInfo!;
          this.InputMaster_Account = res.data!.account!;
        }
        else
          this.showMessageInfo(res.msg!);
      } else {
        this.showMessageError(res.msg!);
      }
    }, err => {
      if (err.status == 401 || err.status == 403) this.setLogin(false);
      else if (err.status == 500) this.showMessageError(err.msg);
    })
  }


  handleActionClick(ev: I_ToolbarComponent_ActionClick): void {
    switch (ev.code) {
      case Action_Type_Enum.SAVE: {
        switch (this.action_type) {
          case Action_Type_Enum.ADD:
          case Action_Type_Enum.COPY: {
            this.InsertData();
            break;
          }
        }
        break;
      }
    }
  }



  InsertData() {
    const obj = {
      account: {
        ...this.InputMaster_Account,
        ...this.InputMaster_AccountChangePassword
      },
      userInfo: this.InputMaster_UserInfo,
    } as AccountClientProfileModel;

    this.accountClient.accountIns(obj).subscribe(res => {
      if (res.status == 0) {
        // this.location.back();
        this.setNavigator('role-edit', this.InputMaster_Account)
        this.showMessageSuccess(res.msg!);
      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

}

