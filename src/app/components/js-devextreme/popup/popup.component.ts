import { Component, EventEmitter, Injector, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DxPopupComponent, DxPopupTypes } from 'devextreme-angular/ui/popup';
import { ToolbarItem } from 'devextreme/ui/popup';
import { Action_Type_Enum } from './enum_action';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent extends LayoutComponentBase implements OnChanges {

  constructor(
    injector: Injector,
  ) {
    super(injector);
    this.property = {
      title: this.title ?? '',
      showTitle: true,
      showCloseButton: true,
      closeOnOutsideClick: true,
    }


    this.fullButton = {
      text: 'Đóng',
      type: 'default',
      icon: 'close',
      onClick: () => {
        this.visible = false;
      }
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ('listAction' in changes) {
      const currentValue = changes['listAction'].currentValue;
      if (currentValue.length > 0) {
        this.listAction = currentValue;
        this.genListAction()
        if (this.popupComponent) {
          this.popupComponent.toolbarItems = this.actions;
          this.popupComponent.instance._refresh();
        }
      }
    }
    if ('title' in changes) {
      this.property.title = changes['title'].currentValue;
      if (this.popupComponent) {
        this.popupComponent.instance.option(this.property)
      }
    }
    if ('action' in changes) {
      this.action = changes['action'].currentValue;
      this.genListAction()
      if (this.popupComponent) {
        this.popupComponent.toolbarItems = this.actions;
        this.popupComponent.instance._refresh();
      }
    }
  }

  actions: ToolbarItem[] = []
  visible: boolean = false;

  fullButton: DxButtonTypes.Properties;

  @Input() action: Action_Type_Enum | undefined = undefined;
  @Input() title!: string;
  @Input() property: DxPopupTypes.Properties;
  @Input() listAction: Action_Type_Enum[] = [];

  @Output() actionClick = new EventEmitter<{ code: string }>();
  @ViewChild('popupComponent') popupComponent: DxPopupComponent | undefined;


  setShow(state: boolean) {
    if (state) this.popupComponent?.instance.show();
    else this.popupComponent?.instance.hide();
    if (this.popupComponent && this.popupComponent.fullScreen !== undefined) {
      this.popupComponent.fullScreen = false;
      if (window.innerWidth < 900) this.popupComponent.fullScreen = true;
    }
    if (this.popupComponent) this.popupComponent.instance._refresh();
  }

  handleHidden(ev: any) {
    this.visible = false;
  }

  // setShowPopup(state: boolean) {
  //   if (state) return this.popupComponent?.instance.show().then(() => Promise.resolve);
  //   else return this.popupComponent?.instance.hide().then(() => Promise.resolve);
  // }

  ngAfterViewInit(): void {

    if (this.popupComponent) {
      this.genListAction()
      this.popupComponent.instance.option({
        ...this.property,
        toolbarItems: this.actions
      })
    }

  }

  // event click action
  handleClickAction(ev: { code: string }) {
    this.actionClick.emit(ev);
  }


  // Generate list action
  genListAction() {
    this.actions = [];

    let dataSourceButtonFilter = dateSourceButton
    let copyListAction = this.listAction;
    if (this.action && this.action == Action_Type_Enum.VIEW) {
      const listActionForView = [Action_Type_Enum.CLOSE];
      copyListAction = listActionForView;
    }
    copyListAction.forEach(item => {
      const findItemInDataSourceConfig = dateSourceButton.find(x => x.code == item);
      this.actions.push({
        widget: 'dxButton',
        toolbar: 'bottom',
        location: 'after',
        visible: true,
        cssClass: findItemInDataSourceConfig?.code,
        options: {
          text: this.translate(findItemInDataSourceConfig?.textVN ?? '', findItemInDataSourceConfig?.text || ""),
          stylingMode: findItemInDataSourceConfig ? findItemInDataSourceConfig.stylingMode : 'contained',
          type: findItemInDataSourceConfig ? findItemInDataSourceConfig.type : 'default',
          onClick: this.handleClickAction.bind(this, { code: item })
        } as DxButtonTypes.Properties
      })

    });

    this.actions.push({
      widget: 'dxButton',
      toolbar: 'top',
      location: 'after',
      visible: true,
      cssClass: "SIZE_WINDOW",
      options: {
        icon: this.popupComponent?.fullScreen ? 'copy' : 'fullscreen',
        stylingMode: 'text',
        onClick: this.handleClickFullScreen.bind(this)
      } as DxButtonTypes.Properties
    })
  }

  handleClickFullScreen() {
    if (this.popupComponent && this.popupComponent.fullScreen !== undefined) {
      this.popupComponent.fullScreen = !this.popupComponent?.fullScreen;
      this.popupComponent?.instance._refresh();
      this.genListAction()
      this.popupComponent?.instance.option({
        toolbarItems: this.actions
      })
      this.popupComponent?.instance._refresh();
    }
  }

}



const dateSourceButton = [
  {
    code: Action_Type_Enum.ADD,
    stylingMode: 'contained',
    type: 'default',
    textVN: 'Thêm',
    text: "Add",
  },
  {
    code: Action_Type_Enum.CLOSE,
    stylingMode: 'text',
    type: 'danger',
    textVN: 'Đóng',
    text: "Close",
  },
  {
    code: Action_Type_Enum.DELETE,
    stylingMode: 'contained',
    type: 'default',
    textVN: 'Xóa',
    text: "Delete",
  },
  {
    code: Action_Type_Enum.EDIT,
    stylingMode: 'contained',
    type: 'default',
    textVN: 'Chỉnh sửa',
    text: "Edit",
  },
  {
    code: Action_Type_Enum.SAVE,
    stylingMode: 'contained',
    type: 'default',
    textVN: 'Lưu',
    text: "Save",
  },
  {
    code: Action_Type_Enum.UPDATE,
    stylingMode: 'contained',
    type: 'default',
    textVN: 'Cập nhật',
    text: "Update",
  },
  {
    code: Action_Type_Enum.VIEW,
    stylingMode: 'contained',
    type: 'default',
    textVN: 'Xem',
    text: "View",
  },
]

