import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsdetailComponent } from './leadsdetail.component';

describe('LeadsdetailComponent', () => {
  let component: LeadsdetailComponent;
  let fixture: ComponentFixture<LeadsdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
