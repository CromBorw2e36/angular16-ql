import { HttpClient } from '@angular/common/http';
import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SessionStorageServiceService } from '../session-storage/session-storage-service.service';
import { BehaviorSubject } from 'rxjs';
import { typeOfSwitchLogin } from '../../page/common/type-of-variable';
import { Account, UserInfo } from '../../server/api_share';

@Injectable({
  providedIn: 'root'
})

export class SysLoginService implements OnInit, OnChanges {

  isLogin: BehaviorSubject<boolean | undefined> = new BehaviorSubject<boolean | undefined>(undefined);

  constructor(private sessionData: SessionStorageServiceService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.isLogin);
  }
  ngOnInit(): void {
  }

  checkIsLogin() {
    return this.isLogin.asObservable();
  }

  setLogin(status: boolean | undefined) {
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

  getIsTypeSwitchLogin() {
    const getData = this.sessionData.getSessionData('isTypeSwitchLogin');
    if (getData === 'LOGIN' || getData === 'REGISTER') {
      return getData;
    } else {
      return "LOGIN";
    }
  }

  setIsTypeSwitchLogin(pType: typeOfSwitchLogin) {
    this.sessionData.setSessionData('isTypeSwitchLogin', pType);
  }

  removeIsTypeSwitchLogin() {
    this.sessionData.removeSessionData('isTypeSwitchLogin');
  }

  setDataRegister(pAccount: Account, pUser: UserInfo) {
    this.sessionData.setSessionData('dataRegister', JSON.stringify({ account: pAccount, user: pUser }));
  }

  getDataRegister() {
    const getData = this.sessionData.getSessionData('dataRegister');
    return JSON.parse(getData ?? "{}");
  }
}
