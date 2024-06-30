import { Location } from '@angular/common';
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { AvatarImageComponent } from 'src/app/components/editor/avatar-image/avatar-image.component';
import { IVoucher_Form_UI, VoucherFormComponent } from 'src/app/components/form/voucher-form/voucher-form/voucher-form.component';
import { Action_Type_Enum, _ACTION_TYPE_CODE } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { Account, AccountClientProfileModel, AccountsClient, StatusMessageOfListOfUploadFileModel, UploadFileModel, UserInfo } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent extends LayoutComponentBase implements OnInit, IVoucher_Form_UI, IToolBarComponent {

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
  tableNameSQL: string = "UserInfomation";

  action_type: Action_Type_Enum | undefined

  @Input() dataFilter: AccountClientProfileModel = new AccountClientProfileModel();

  @ViewChild('voucherFormComponent') voucherFormComponent: VoucherFormComponent | undefined;
  @ViewChild('avatarImageComponent') avatarImageComponent: AvatarImageComponent | undefined;

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
        case Action_Type_Enum.COPY:
        case Action_Type_Enum.EDIT:
        case Action_Type_Enum.VIEW: {
          const obj = state.data as UserInfo;
          this.onLoadData({
            account: obj.id,
            companyCode: obj.codeCompany,
          } as Account);
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
          case Action_Type_Enum.EDIT: {
            this.UpdateData();
            break;
          }

        }
        break;
      }
      case Action_Type_Enum.UPDATE_PASSWORD: {
        this.UpdatePassword();
        break;
      }
      case Action_Type_Enum.APPROVAL: {
        const obj = new Account();
        obj.account = this.InputMaster.account?.account;
        obj.companyCode = this.InputMaster.account?.companyCode;
        this.accountClient.accountChangeStatusApproval(obj).subscribe(res => {
          if (res.status == 0) {
            this.location.back();
            this.showMessageSuccess(res.msg!)
          } else {
            this.showMessageError(res.msg!)
          }
        }, error => {
          if (error.status == 401 || error.status == 403) this.setLogin(false);
          else if (error.status == 500) this.showMessageError(error.msg)
        });
        break;
      }
    }
  }

  UpdateData() {
    if (this.avatarImageComponent && this.avatarImageComponent.uploadFile?.isEdit) {
      const uploadParams: UploadFileModel = {
        table_name: this.tableNameSQL,
        col_name: "avatar",
      } as UploadFileModel;

      const result = this.avatarImageComponent.handleGetInputMaster(uploadParams);

      if (result) {
        result.then(res => {
          if (res && res.status == 200) {
            res.json().then((data: StatusMessageOfListOfUploadFileModel) => {

              this.InputMaster_UserInfo.avatar = data.data![0].id as string;
              this.InputMaster_UserInfo.avatar16 = data.data![0].id as string;
              this.InputMaster_UserInfo.avatar32 = data.data![0].id as string;
              this.InputMaster_UserInfo.avatar64 = data.data![0].id as string;

              const obj = {
                account: this.InputMaster_Account,
                userInfo: this.InputMaster_UserInfo,
              } as AccountClientProfileModel;

              this.accountClient.accountUpdate(obj).subscribe(res => {
                if (res.status == 0) {
                  this.showMessageInfo(res.msg!);
                  if (this.InputMaster_Account.account === (this.getUserInfo() as Account).account) {
                    if (window.confirm(this.translate("Yêu cầu đăng nhập lại để cập nhật thông tin của tài khoản", "Please login again to update your account information"))) {
                      this.setLogin(false);
                    }

                  } else {
                    this.InputMaster_AccountChangePassword = new Account();
                  }
                  this.location.back();
                } else {
                  this.showMessageError(res.msg!);
                }
              }, error => {
                if (error.status == 401 || error.status == 403) this.setLogin(false);
                else if (error.status == 500) this.showMessageError(error.msg)
              })

            })
              .catch(err => {
                this.showMessageError(this.translate("Vui lòng thử lại!", "Please try again!"));
              });
          } else {
            this.showMessageError(this.translate("Vui lòng thử lại!", "Please try again!"));
          }
        })
      }
    } else {
      const obj = {
        account: this.InputMaster_Account,
        userInfo: this.InputMaster_UserInfo,
      } as AccountClientProfileModel;
      this.accountClient.accountUpdate(obj).subscribe(res => {
        if (res.status == 0) {
          this.showMessageInfo(res.msg!);
          if (this.InputMaster_Account.account === (this.getUserInfo() as Account).account) {
            if (window.confirm(this.translate("Yêu cầu đăng nhập lại để cập nhật thông tin của tài khoản", "Please login again to update your account information"))) {
              this.setLogin(false);
            }

          } else {
            this.InputMaster_AccountChangePassword = new Account();
          }
          this.location.back();
        } else {
          this.showMessageError(res.msg!);
        }
      }, error => {
        if (error.status == 401 || error.status == 403) this.setLogin(false);
        else if (error.status == 500) this.showMessageError(error.msg)
      })
    }
  }

  InsertData() {
    const obj = {
      account: this.InputMaster_Account,
      userInfo: this.InputMaster_UserInfo,
    } as AccountClientProfileModel;

    this.accountClient.accountIns(obj).subscribe(res => {
      if (res.status == 0) {
        this.location.back();
        this.showMessageSuccess(res.msg!);
      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

  UpdatePassword() {

    if (this.InputMaster_AccountChangePassword.password == undefined || this.InputMaster_AccountChangePassword.password == "") {
      this.showMessageError(this.translate("Vui lòng nhập mật khẩu cũ", "Please enter old password"));
      return;
    }

    if (this.InputMaster_AccountChangePassword.password1 == undefined || this.InputMaster_AccountChangePassword.password1 == "") {
      this.showMessageError(this.translate("Vui lòng nhập mật khẩu mới", "Please enter new password"));
      return;
    }

    const obj = {
      account: this.InputMaster_Account.account,
      password: this.InputMaster_AccountChangePassword.password,
      password1: this.InputMaster_AccountChangePassword.password1,
      companyCode: this.InputMaster_Account.companyCode,
    } as Account;

    this.accountClient.accountChangePassword(obj).subscribe(res => {
      if (res.status == 0) {
        this.showMessageInfo(res.msg!);
        if (this.InputMaster_Account.account === (this.getUserInfo() as Account).account) {
          this.setLogin(false);
        } else {
          this.InputMaster_AccountChangePassword = new Account();
        }

      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }
}


