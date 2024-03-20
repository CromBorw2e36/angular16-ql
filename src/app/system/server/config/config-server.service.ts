import { Injectable, Injector } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';

@Injectable({
  providedIn: 'root',
})
export class ConfigServerService  {
  // BASE_URL_SERVER: string = 'https://localhost:44334';
  BASE_URL_SERVER: string = 'https://localhost:7119';
  // BASE_URL_SERVER: string = 'https://a9d8-2402-9d80-3dc-dbb9-95f2-8925-7699-236b.ngrok-free.app';
  // BASE_URL_SERVER: string = 'https://88c4-2402-800-634b-8536-e806-2a16-16d2-b904.ngrok-free.app';
  HEADER_REQUEST = {
    'content-type': 'application/json',
    // "authorization": 'QUANLIAPP'
  } as any;
  constructor() {
  }
}
