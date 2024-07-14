import { Injectable, Injector } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';

@Injectable({
  providedIn: 'root',
})
export class ConfigServerService  {
  // BASE_URL_SERVER: string = 'https://58ca-2402-800-63e2-8816-44b5-67e2-1378-19b.ngrok-free.app';
  // BASE_URL_SERVER: string = 'https://localhost:44334';
  // BASE_URL_SERVER: string = 'https://localhost:7119';
  // BASE_URL_SERVER: string = 'https://192.168.1.12:44334';
  BASE_URL_SERVER: string = 'https://1882-171-243-60-22.ngrok-free.app';
  // BASE_URL_SERVER: string = 'https://88c4-2402-800-634b-8536-e806-2a16-16d2-b904.ngrok-free.app';
  HEADER_REQUEST = {
    'content-type': 'application/json',
    // "authorization": 'QUANLIAPP'
  } as any;
  constructor() {
  }
}
