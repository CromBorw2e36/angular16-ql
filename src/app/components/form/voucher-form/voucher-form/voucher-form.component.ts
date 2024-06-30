import { I_EventValueChange } from './../voucher-form-col-item/voucher-form-col-item.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DxDateBoxTypes } from 'devextreme-angular/ui/date-box';
import { DxNumberBoxTypes } from 'devextreme-angular/ui/number-box';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { CommonContronllerClient, QueryCommonModel, SysVoucherFormClient, SysVoucherFormColumn, SysVoucherFormGroup } from 'src/app/system/server/api_share';

export interface IVoucher_Form_UI {
  voucherFormComponent: VoucherFormComponent | undefined
  ValueChangedEventVoucherForm(data: any): void;
}


@Component({
  selector: 'voucher-form-component',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoucherFormComponent extends LayoutComponentBase implements OnInit, OnChanges {
  constructor(
    injector: Injector,
    private sysVoucherFormClient: SysVoucherFormClient,
    private cdr: ChangeDetectorRef,
    private commonClient: CommonContronllerClient
  ) {
    super(injector);
    this.dataSourceVoucherFormGroup = [];
    this.dataSourceVoucherFormColumns = [];
  }

  dataSourceVoucherFormColumns: SysVoucherFormColumn[];
  dataSourceVoucherFormGroup: SysVoucherFormGroup[];
  typeComponent = {
    textBox: 'TEXTBOX',
    checkBox: "CHECKBOX",
    dateBox: "DATEBOX",
    numberBox: "NUMBERBOX",
    comboBox: "COMBOBOX",
    textArea: "TEXTAREA",
  }
  dataSourceSelectBox: any = {}

  @Input() table_name!: string;
  @Input() InputMaster!: any;

  @Output() valueChanged = new EventEmitter<any>();

  ngOnInit(): void {
    this.OnLoadVoucherFormGroups();
  }

  ngOnChanges(simple: SimpleChanges): void {

  }


  ngAfterContentChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
  }

 public  OnLoadVoucherFormGroups() {
    const requestParam = {
      table_name: this.table_name
    } as SysVoucherFormColumn
    this.sysVoucherFormClient.voucherFormGroupSearch(requestParam).subscribe(res => {
      if (res.status == 0) {
        this.dataSourceVoucherFormGroup = res.data!;
        //console.log(this.dataSourceVoucherFormGroup)
      } else {
        this.showMessageError(res.msg!);
      }
      this.OnLoadVoucherFormColumns();
    })
  }

  public OnLoadVoucherFormColumns() {
    const requestParam = {
      table_name: this.table_name
    } as SysVoucherFormColumn
    this.sysVoucherFormClient.voucherFormColumnSearch(requestParam).subscribe(res => {
      if (res.status == 0) {
        this.dataSourceVoucherFormColumns = res.data!;
        this.EventLoadDataSourceSelectBox();
      } else {
        this.showMessageError(res.msg!);
      }
    })
  }

  private handleValueChange(ev: I_EventValueChange<any>) {
    this.InputMaster[ev.dataField] = ev.value;
    this.valueChanged.emit(this.InputMaster);
  }

  protected handleUpdateInputMaster(paramUpdate: any) {
    this.InputMaster = { ...paramUpdate };
  }

  protected handleGetValueInputMaster() {
    return this.InputMaster;
  }

  protected getVoucherFormByGroup(group_id: string) {
    const data = this.dataSourceVoucherFormColumns.filter(x => x.groupId == group_id);
    return data;
  }

  // getDataSourceForm() {
  //   console.log(this.count++)
  //   return this.dataSourceVoucherFormGroup;
  // }


  public _refresh() {
    this.OnLoadVoucherFormGroups();
  }


  protected ValueChange(dataField: string,  value: any) {
    const obj: I_EventValueChange<any> = {
      dataField,
      value: value,
    }
    this.handleValueChange(obj);
  }

  get GenValueConfig() {
    return this.InputMaster as any
  }

  get GenValueConfigDate() {
    if (this.InputMaster.mode === undefined) this.InputMaster.mode = "text";
    return this.InputMaster as DxDateBoxTypes.Properties;
  }

  get GenValueConfigNumber() {
    const obj = this.InputMaster as DxNumberBoxTypes.Properties;
    obj.showSpinButtons = true;
    return obj as DxNumberBoxTypes.Properties;
  }

  private EventLoadDataSourceSelectBox() {
    const data = this.dataSourceVoucherFormColumns.filter(x => x.typeControl == this.typeComponent.comboBox);
    data.forEach(element => {
      this.getDataSourceSelectBox(element);
    });
  }

  private getDataSourceSelectBox(data: SysVoucherFormColumn) {
    if(!data.query || data.query == "") return;
    const obj = {
      string_query: data.query,
    } as QueryCommonModel
    this.commonClient.excuteQueryStringV2(obj).subscribe(res => {
      if(res.status == 0){
        this.dataSourceSelectBox[data.code!] = JSON.parse(res.data!);
      }else{
        this.dataSourceSelectBox[data.code!] = [];
        this.showMessageError(this.translate(`Không thể tải dữ liệu của  ${this.InputMaster.labelControlVN}`, `Cannot load data of ${this.InputMaster.labelControl}`));
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(this.translate(`Không thể tải dữ liệu của  ${this.InputMaster.labelControlVN}`, `Cannot load data of ${this.InputMaster.labelControl}`));
      this.dataSourceSelectBox[data.code!] = [];
    })
  }
}
