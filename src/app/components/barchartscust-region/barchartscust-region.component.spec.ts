import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartscustRegionComponent } from './barchartscust-region.component';

describe('BarchartscustRegionComponent', () => {
  let component: BarchartscustRegionComponent;
  let fixture: ComponentFixture<BarchartscustRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartscustRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartscustRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
