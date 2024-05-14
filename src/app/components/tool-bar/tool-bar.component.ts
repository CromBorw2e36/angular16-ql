import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { MenuV2Service } from '../menu-v2/service/menu-v2.service';
import { SysAction, SysActionClient, SysGroupAction } from './../../system/server/api_share';
import { Component, Input, Injector, EventEmitter, Output } from '@angular/core';

export interface I_ToolbarComponent_ActionClick {
  code: string;
  itemData: SysAction,
  time: Date;
  event: PointerEvent;
}

@Component({
  selector: 'tool-bar-component',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent extends LayoutComponentBase {

  constructor(
    private sysActionClient: SysActionClient,
    private menuV2Service: MenuV2Service,
    injector: Injector
  ) {
    super(injector);
  }

  @Input() action_type!: '1' | '2' | '3' | '4' | '5' | '6' | '7'

  dataSource: SysAction[] = [];

  @Output() onActionClick = new EventEmitter<I_ToolbarComponent_ActionClick>();

  ngAfterViewInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    const paramObj = {
      code: this.menuV2Service.itemSelectedMenu[`action${this.action_type!}`]
    } as SysGroupAction;
    this.sysActionClient.getListActionByGroupCode(paramObj).subscribe(res => {
      if (res.status == 0) {
        if (res.data) {
          this.dataSource = res.data;
        }
      } else {
        this.showMessageError(res.msg)
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

  getTextTranslate(item: SysAction) {
    return this.translate(item.nameVn, item.nameOther);
  }

  handleClick(ev: any, item: SysAction) {
    const obj = {
      code: item.code!,
      itemData: item,
      time: new Date(),
      event: ev
    }
    this.onActionClick.emit(obj)
    // console.log(obj)
  }

}
