import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinPhongBanEditComponent } from './thong-tin-phong-ban-edit.component';

describe('ThongTinPhongBanEditComponent', () => {
  let component: ThongTinPhongBanEditComponent;
  let fixture: ComponentFixture<ThongTinPhongBanEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinPhongBanEditComponent]
    });
    fixture = TestBed.createComponent(ThongTinPhongBanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
