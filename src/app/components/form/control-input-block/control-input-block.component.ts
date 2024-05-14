import { Component, Injector } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import PropertiesControlInputModel from './common/propertiseControlInputModel';
import Properties_Component_ENTITY from './common/Properties_Component_ENTITY';

@Component({
  selector: 'control-input-block',
  templateUrl: './control-input-block.component.html',
  styleUrls: ['./control-input-block.component.scss']
})
export class ControlInputBlockComponent extends LayoutComponentBase {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }


  propertyControlInputComponent: PropertiesControlInputModel<any> = new PropertiesControlInputModel<any>();
  propertiesComponent: Properties_Component_ENTITY | undefined;

}
