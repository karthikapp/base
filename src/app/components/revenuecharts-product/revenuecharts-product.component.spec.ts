import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuechartsProductComponent } from './revenuecharts-product.component';

describe('RevenuechartsProductComponent', () => {
  let component: RevenuechartsProductComponent;
  let fixture: ComponentFixture<RevenuechartsProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenuechartsProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuechartsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
