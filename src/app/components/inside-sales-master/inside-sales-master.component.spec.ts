import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideSalesMasterComponent } from './inside-sales-master.component';

describe('InsideSalesMasterComponent', () => {
  let component: InsideSalesMasterComponent;
  let fixture: ComponentFixture<InsideSalesMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideSalesMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideSalesMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
