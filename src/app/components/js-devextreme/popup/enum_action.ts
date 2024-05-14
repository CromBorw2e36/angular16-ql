import { DxPopupTypes } from "devextreme-angular/ui/popup";

export enum Action_Type_Enum {
    "ADD" = "ADD",
    "SAVE" = "SAVE",
    "UPDATE" = "UPDATE",
    "DELETE" = "DELETE",
    "EDIT" = "EDIT",
    "VIEW" = "VIEW",
    "CLOSE" = "CLOSE",
    "COPY" = "COPY"
}

export interface IPopupComponent {
    propertiesPopupComponent?: DxPopupTypes.Properties;
    listAction?: Action_Type_Enum[];
    typeAction?: Action_Type_Enum | undefined;

    setShowPopup(ev: { state: boolean, typeAction: Action_Type_Enum, data: any }): void;
    onActionClick_PopupComponent(ev: { code: string }): void;
}
