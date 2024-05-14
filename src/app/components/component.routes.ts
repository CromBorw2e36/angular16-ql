import { Routes } from "@angular/router";
import { TextBoxComponent } from "./editor/text-box/text-box.component";
import { TreeViewComponent } from "./js-devextreme/navigation/tree-view/tree-view.component";
import { ControlInputBlockComponent } from "./form/control-input-block/control-input-block.component";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";

const routes: Routes = [
  { path: 'editor-text-box', component: TextBoxComponent },
  { path: 'tree-view-component', component: TreeViewComponent },
  { path: 'control-input-block', component: ControlInputBlockComponent },
  { path: 'tool-bar-component', component: ToolBarComponent },
];

export default routes;