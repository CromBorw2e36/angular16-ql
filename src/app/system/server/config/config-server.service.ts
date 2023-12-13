import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigServerService {
  BASE_URL_SERVER: string = 'https://localhost:44334';
  HEADER_REQUEST = {
    'content-type': 'application/json',
    // "authorization": 'MyToken'
  } as any;
  constructor() {}
}
