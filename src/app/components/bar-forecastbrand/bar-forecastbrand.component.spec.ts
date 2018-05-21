import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarForecastbrandComponent } from './bar-forecastbrand.component';

describe('BarForecastbrandComponent', () => {
  let component: BarForecastbrandComponent;
  let fixture: ComponentFixture<BarForecastbrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarForecastbrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarForecastbrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
