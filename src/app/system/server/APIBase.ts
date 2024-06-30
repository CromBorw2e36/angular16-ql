import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { Injector } from '@angular/core';

export class APIBase extends LayoutComponentBase {
  authToken = '';
  base_url = '';
  public constructor(injector: Injector) {
    super(injector);
    this.authToken = 'QUAN-LI-APP';
    this.base_url = this.configService.BASE_URL_SERVER
  }

  setAuthToken(text: string) {
    this.authToken = text;
  }

  public getBaseUrl(text: string) {
    return this.base_url;
  }

  protected transformOptions(options: any): Promise<any> {
    try {
      const token = this.cookieService.get('TOKEN');
      options.headers = options.headers.append(
        'Authorization',
        `${this.authToken}`
      );
      options.headers = options.headers.append('Token', token);
    } catch {
      // console.log(`transformOptions ERROR`);
    }
    return Promise.resolve(options);
  }
}
