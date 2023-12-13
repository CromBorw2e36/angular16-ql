import { Inject, Injectable } from '@angular/core';

@Injectable()
export default class LayoutComponentBase {
  constructor() {}

  translate(
    message_vn: string | undefined,
    message_other: string | undefined
  ): string {
    return message_vn ? message_vn : '';
  }
}
