import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelchartsComponent } from './funnelcharts.component';

describe('FunnelchartsComponent', () => {
  let component: FunnelchartsComponent;
  let fixture: ComponentFixture<FunnelchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
