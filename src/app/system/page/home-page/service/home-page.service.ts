import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor() { }

  loading: boolean = false;

  setLoading(res: boolean = false) {
    this.loading = res;
  }

}
