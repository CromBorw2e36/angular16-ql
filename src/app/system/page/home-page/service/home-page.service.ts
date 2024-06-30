import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor() { }

  loading: boolean = false;

  getLoading() {
    return this.loading;
  }

  setLoading(res: boolean = false) {
    this.loading = res;
  }

}
