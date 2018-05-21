import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarForecastexecComponent } from './bar-forecastexec.component';

describe('BarForecastexecComponent', () => {
  let component: BarForecastexecComponent;
  let fixture: ComponentFixture<BarForecastexecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarForecastexecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarForecastexecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
