import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsideSalesComponent } from './inside-sales.component';

describe('InsideSalesComponent', () => {
  let component: InsideSalesComponent;
  let fixture: ComponentFixture<InsideSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
