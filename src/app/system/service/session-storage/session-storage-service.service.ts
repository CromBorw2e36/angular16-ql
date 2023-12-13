import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageServiceService {

  constructor() { }

  setSessionData(key: string, value: any) {
    try {
      sessionStorage.setItem(key, value);
    }
    catch {
      console.log('Not found sessionStorage');
    }
  }

  getSessionData(key: string) {
    try {
      const data = sessionStorage.getItem(key);
      return data ? data : null;
    } catch {
      console.log('Not found sessionStorage');
      return null;
    }
  }
}
