import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelallregionchartsComponent } from './funnelallregioncharts.component';

describe('FunnelallregionchartsComponent', () => {
  let component: FunnelallregionchartsComponent;
  let fixture: ComponentFixture<FunnelallregionchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelallregionchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelallregionchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
