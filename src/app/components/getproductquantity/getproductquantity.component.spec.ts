import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetproductquantityComponent } from './getproductquantity.component';

describe('GetproductquantityComponent', () => {
  let component: GetproductquantityComponent;
  let fixture: ComponentFixture<GetproductquantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetproductquantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetproductquantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
