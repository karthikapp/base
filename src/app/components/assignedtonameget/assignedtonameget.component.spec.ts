import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtonamegetComponent } from './assignedtonameget.component';

describe('AssignedtonamegetComponent', () => {
  let component: AssignedtonamegetComponent;
  let fixture: ComponentFixture<AssignedtonamegetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedtonamegetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedtonamegetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
