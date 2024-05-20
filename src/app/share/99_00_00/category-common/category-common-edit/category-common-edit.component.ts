import { Location } from '@angular/common';
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { IVoucher_Form_UI, VoucherFormComponent } from 'src/app/components/form/voucher-form/voucher-form/voucher-form.component';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { CategoryCommonClient, CategoryCommonModel } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-category-common-edit',
  templateUrl: './category-common-edit.component.html',
  styleUrls: ['./category-common-edit.component.scss']
})
export class CategoryCommonEditComponent extends LayoutComponentBase implements OnInit, IVoucher_Form_UI, IToolBarComponent {

  constructor(
    injector: Injector,
    private categoryCommonClient: CategoryCommonClient,
    private location: Location
  ) {
    super(injector);
  }
  action_type_toolbar: '1' | '2' | '3' | '4' | '5' | '6' | '7' = '2';

  InputMaster: CategoryCommonModel = new CategoryCommonModel();
  action_type: Action_Type_Enum | undefined

  @Input() dataFilter: CategoryCommonModel = new CategoryCommonModel();

  @ViewChild('voucherFormComponent') voucherFormComponent: VoucherFormComponent | undefined;

  ngOnInit(): void {
    const state = this.getRouterState<CategoryCommonModel>();
    // console.log(state)

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
          this.onLoadData(state.data);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  onInitActionAdd() {
    this.InputMaster = new CategoryCommonModel();
  }



  ValueChangedEventVoucherForm(event: any): void {

  }

  onLoadData(model: CategoryCommonModel) {
    this.categoryCommonClient.categoryCommonSearch(model).subscribe(res => {
      if (res.status == 0) {
        if (res.data && res.data.length > 0) {
          this.InputMaster = res.data[0]!;
          if (this.action_type == Action_Type_Enum.COPY) {
            this.InputMaster.number_order = (this.InputMaster.number_order ?? 0) + 5;
          }
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
    }
  }

  UpdateData() {
    this.categoryCommonClient.categoryCommonUpdate(this.InputMaster).subscribe(res => {
      if (res.status == 0) {
        this.showMessageInfo(res.msg!);
        this.location.back();
      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

  InsertData() {
    this.categoryCommonClient.categoryCommonInsert(this.InputMaster).subscribe(res => {
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
}