import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import LayoutComponentBase from '../../share/layoutBase/LayoutComponentBase';
import {
  IGenericMenu,
  IGenericMenuChild2,
} from 'src/app/system/service/sys-menu/sys-menu.service';
import { Router } from '@angular/router';
import { SysMenu } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent
  extends LayoutComponentBase
  implements OnChanges, OnChanges, OnInit
{
  constructor(injector: Injector) {
    super(injector);
    this.menuPermissions = [];
  }
  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {}

  ngAfterViewInit(): void {
    this.CTColapse();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  @Input() menuPermissions: IGenericMenu[] = [];
  navigator(pMenu: SysMenu | undefined): void {
    if (pMenu) {
      const url = pMenu?.url;
      this.setNavigator(url, pMenu);
    }
  }

  identifyFarent(index: number, item: IGenericMenu) {
    return item.parent.menuid;
  }

  identifyChild(index: number, item: IGenericMenuChild2) {
    return item.parent.menuid;
  }

  CTColapse() {
    let itemCollapse = document.querySelectorAll('.ct-collapse');
    itemCollapse.forEach((element) => {
      element.addEventListener('click', function (event: any) {
        if (event.target.id) {
          const targetId = event.target.id;
          document.querySelectorAll('.ct-collapse').forEach((el) => {
            el.classList.remove('active');
          });
          const elementsWithId = document.querySelectorAll(
            `[id='${targetId}']`
          );
          elementsWithId.forEach((el) => {
            el.classList.add('active');
            if (el.classList.contains('show')) {
              el.classList.remove('show');
            } else {
              el.classList.add('show');
            }
          });
          const elementWithId = document.getElementsByClassName(targetId);
          for (let i = 0; i < elementWithId.length; i++) {
            const element = elementWithId[i];
            if (element) {
              if (element.classList.contains('show')) {
                element.classList.remove('show');
              } else {
                element.classList.add('show');
              }
            }
          }
        }
      });
    });
  }
}
