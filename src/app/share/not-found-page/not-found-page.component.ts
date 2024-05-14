import { Component, Injector } from '@angular/core';
import LayoutComponentBase from '../layoutBase/LayoutComponentBase';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent extends LayoutComponentBase{

  constructor(
    injector: Injector,
  ) {
    super(injector);

    this.textHeader = this.translate('Không tìm thấy trang', 'Oops! Page Not Be Found');
    this.textContent = this.translate('Xin lỗi, trang bạn yêu cầu không tồn tại hoặc đã bị xóa', 'Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable');
    this.textContact = this.translate('Tôi cần trợ giúp!', 'Let me help you!');
  }

  textHeader:string;
  textContent:string;
  textContact:string;
  handleRoute(){

  }
}
