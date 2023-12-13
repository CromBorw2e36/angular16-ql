import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadPanelDevextremeComponent } from './load-panel-devextreme.component';

describe('LoadPanelDevextremeComponent', () => {
  let component: LoadPanelDevextremeComponent;
  let fixture: ComponentFixture<LoadPanelDevextremeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadPanelDevextremeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadPanelDevextremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
