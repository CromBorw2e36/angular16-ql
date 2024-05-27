import { DxPopupTypes } from "devextreme-angular/ui/popup";

/**
 * Mỗi khi thêm một action mới thì cần bổ sung vào Action_Type_Enum và _ACTION_TYPE_CODE ở dưới
 */


export enum Action_Type_Enum {
    "ADD" = "ADD",
    "SAVE" = "SAVE",
    "UPDATE" = "UPDATE",
    "DELETE" = "DELETE",
    "EDIT" = "EDIT",
    "VIEW" = "VIEW",
    "CLOSE" = "CLOSE",
    "COPY" = "COPY",
    "UPDATE_PASSWORD" = "UPDATE_PASSWORD",
    "APPROVAL" = "APPROVAL",
    "PERMISSION" = "PERMISSION",
}

export const _ACTION_TYPE_CODE = {
    ADD: "ADD",
    SAVE: "SAVE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    EDIT: "EDIT",
    VIEW: "VIEW",
    CLOSE: "CLOSE",
    COPY: "COPY",
    UPDATE_PASSWORD: "UPDATE_PASSWORD",
    APPROVAL: "APPROVAL",
    PERMISSION: "PERMISSION",
} as object

export interface IPopupComponent {
    propertiesPopupComponent?: DxPopupTypes.Properties;
    listAction?: Action_Type_Enum[];
    typeAction?: Action_Type_Enum | undefined;

    setShowPopup(ev: { state: boolean, typeAction: Action_Type_Enum, data: any }): void;
    onActionClick_PopupComponent(ev: { code: string }): void;

}
