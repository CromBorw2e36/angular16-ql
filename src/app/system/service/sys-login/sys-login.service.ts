import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SessionStorageServiceService } from '../session-storage/session-storage-service.service';
import { BehaviorSubject } from 'rxjs';
import { ConfigServerService } from '../../server/config/config-server.service';
import { AccountsClient } from '../../server/api_share';

@Injectable({
  providedIn: 'root'
})

export class SysLoginService implements OnInit, OnChanges {

  isLogin: BehaviorSubject<boolean | undefined> = new BehaviorSubject<boolean | undefined>(undefined);

  constructor(private sessionData: SessionStorageServiceService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.isLogin);
  }
  ngOnInit(): void {
  }

  checkIsLogin() {
    return this.isLogin.asObservable();
  }

  setLogin(status: boolean) {
    this.isLogin.next(status);
  }

  getAccountInfo() {
    const getData = this.sessionData.getSessionData('user');
    return getData;
  }

  getToken(): string {
    const getData = this.sessionData.getSessionData('TOKEN');
    return getData ?? "";
  }

}
