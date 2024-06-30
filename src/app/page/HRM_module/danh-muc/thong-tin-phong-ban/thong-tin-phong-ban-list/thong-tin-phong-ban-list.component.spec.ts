import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinPhongBanListComponent } from './thong-tin-phong-ban-list.component';

describe('ThongTinPhongBanListComponent', () => {
  let component: ThongTinPhongBanListComponent;
  let fixture: ComponentFixture<ThongTinPhongBanListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinPhongBanListComponent]
    });
    fixture = TestBed.createComponent(ThongTinPhongBanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
