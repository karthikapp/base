import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuechartsComponent } from './revenuecharts.component';

describe('RevenuechartsComponent', () => {
  let component: RevenuechartsComponent;
  let fixture: ComponentFixture<RevenuechartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuechartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuechartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
