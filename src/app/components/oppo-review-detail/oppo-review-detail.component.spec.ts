import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppoReviewDetailComponent } from './oppo-review-detail.component';

describe('OppoReviewDetailComponent', () => {
  let component: OppoReviewDetailComponent;
  let fixture: ComponentFixture<OppoReviewDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppoReviewDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppoReviewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
