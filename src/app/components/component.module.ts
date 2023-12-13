import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';
import { LoadPanelDevextremeComponent } from '../components/Loading/load-panel-devextreme/load-panel-devextreme.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DxLoadPanelModule } from 'devextreme-angular';

@NgModule({
  declarations: [MenuComponent, LoadPanelDevextremeComponent],
  imports: [CommonModule, DxLoadPanelModule, FormsModule, HttpClientModule],
  providers: [],
  exports: [MenuComponent, LoadPanelDevextremeComponent],
})
export class ComponentModule {}
