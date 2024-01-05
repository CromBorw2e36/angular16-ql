import { Injectable, Injector } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';

@Injectable({
  providedIn: 'root',
})
export class ConfigServerService extends LayoutComponentBase {
  BASE_URL_SERVER: string = 'https://localhost:44334';
  HEADER_REQUEST = {
    'content-type': 'application/json',
    // "authorization": 'MyToken'
  } as any;
  constructor(injector: Injector) {
    super(injector);
  }
}
