import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppodetailComponent } from './oppodetail.component';

describe('OppodetailComponent', () => {
  let component: OppodetailComponent;
  let fixture: ComponentFixture<OppodetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppodetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppodetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
