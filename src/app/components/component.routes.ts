import { Routes } from "@angular/router";
import { TextBoxComponent } from "./editor/text-box/text-box.component";
import { TreeViewComponent } from "./js-devextreme/navigation/tree-view/tree-view.component";
import { ControlInputBlockComponent } from "./form/control-input-block/control-input-block.component";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { VoucherFormComponent } from "./form/voucher-form/voucher-form/voucher-form.component";
import { DateBoxComponent } from "./js-devextreme/editor/date-box/date-box.component";
import { FileUploaderComponent } from "./editor/file-uploader/file-uploader.component";
import { TextBoxDevextremeComponent } from "./editor/text-box-devextreme/text-box-devextreme.component";
import { ControlTextBoxComponent } from "./js-devextreme/editor/text-box/text-box.component";

const routes: Routes = [
  { path: 'editor-text-box', component: TextBoxComponent },
  { path: 'control-text-box-component', component: ControlTextBoxComponent },
  { path: 'tree-view-component', component: TreeViewComponent },
  { path: 'control-input-block', component: ControlInputBlockComponent },
  { path: 'control-date-box', component: DateBoxComponent },
  { path: 'tool-bar-component', component: ToolBarComponent },
  { path: 'voucher-form-component', component: VoucherFormComponent },
  { path: 'file-uploader-component', component: FileUploaderComponent },
];

export default routes;