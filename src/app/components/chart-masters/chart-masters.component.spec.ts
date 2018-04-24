import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMastersComponent } from './chart-masters.component';

describe('ChartMastersComponent', () => {
  let component: ChartMastersComponent;
  let fixture: ComponentFixture<ChartMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
