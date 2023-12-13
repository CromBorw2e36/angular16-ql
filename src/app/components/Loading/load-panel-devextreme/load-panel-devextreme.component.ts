import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxLoadPanelModule } from 'devextreme-angular';
import LayoutComponentBase from '../../../share/layoutBase/LayoutComponentBase';

@Component({
  selector: 'app-load-panel-devextreme',
  templateUrl: './load-panel-devextreme.component.html',
  styleUrls: ['./load-panel-devextreme.component.scss'],
})
export class LoadPanelDevextremeComponent  {
  @Input() InputMaster: boolean = false;
}
