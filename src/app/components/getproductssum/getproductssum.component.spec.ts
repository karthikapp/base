import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetproductssumComponent } from './getproductssum.component';

describe('GetproductssumComponent', () => {
  let component: GetproductssumComponent;
  let fixture: ComponentFixture<GetproductssumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetproductssumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetproductssumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
