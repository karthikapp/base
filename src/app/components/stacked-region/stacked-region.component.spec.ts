import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedRegionComponent } from './stacked-region.component';

describe('StackedRegionComponent', () => {
  let component: StackedRegionComponent;
  let fixture: ComponentFixture<StackedRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
