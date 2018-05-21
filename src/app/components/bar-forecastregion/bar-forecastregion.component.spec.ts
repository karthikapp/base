import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarForecastregionComponent } from './bar-forecastregion.component';

describe('BarForecastregionComponent', () => {
  let component: BarForecastregionComponent;
  let fixture: ComponentFixture<BarForecastregionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarForecastregionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarForecastregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
