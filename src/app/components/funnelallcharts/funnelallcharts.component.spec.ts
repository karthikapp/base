import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelallchartsComponent } from './funnelallcharts.component';

describe('FunnelallchartsComponent', () => {
  let component: FunnelallchartsComponent;
  let fixture: ComponentFixture<FunnelallchartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelallchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelallchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
