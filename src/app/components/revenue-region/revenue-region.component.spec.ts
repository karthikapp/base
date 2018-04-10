import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueRegionComponent } from './revenue-region.component';

describe('RevenueRegionComponent', () => {
  let component: RevenueRegionComponent;
  let fixture: ComponentFixture<RevenueRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
