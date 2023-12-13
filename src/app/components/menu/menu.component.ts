import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import LayoutComponentBase from '../../share/layoutBase/LayoutComponentBase';
import { IGenericMenu } from 'src/app/system/service/sys-menu/sys-menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends LayoutComponentBase implements OnChanges {

  constructor() {
    super();
    this.menuPermissions = [];
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  @Input() menuPermissions: IGenericMenu[] = [];

}


