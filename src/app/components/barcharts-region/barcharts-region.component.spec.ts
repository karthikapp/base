import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartsRegionComponent } from './barcharts-region.component';

describe('BarchartsRegionComponent', () => {
  let component: BarchartsRegionComponent;
  let fixture: ComponentFixture<BarchartsRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarchartsRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartsRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
