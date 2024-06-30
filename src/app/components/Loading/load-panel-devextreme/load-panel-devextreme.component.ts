import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxLoadPanelModule } from 'devextreme-angular';
import LayoutComponentBase from '../../../share/layoutBase/LayoutComponentBase';

@Component({
  selector: 'display-load-panel-devextreme',
  templateUrl: './load-panel-devextreme.component.html',
  styleUrls: ['./load-panel-devextreme.component.scss'],
})
export class LoadPanelDevextremeComponent implements OnChanges {


  ngOnChanges(changes: SimpleChanges): void {
    // if ('InputMaster' in changes) {
    //   const value = changes['InputMaster'].currentValue;
      
    //   if (value) {
    //     document.querySelector('.div_container_loading')?.classList.add('before_hidden1');
    //     setTimeout(() => {
    //       document.querySelector('.div_container_loading')?.classList.add('before_hidden');
    //     }, 200);
    //   }else{
    //     document.querySelector('.div_container_loading')?.classList.remove('before_hidden', 'before_hidden1');
    //   }
    // }
  }

  @Input() InputMaster!: boolean;
}
