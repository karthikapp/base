import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtocompanygetComponent } from './assignedtocompanyget.component';

describe('AssignedtocompanygetComponent', () => {
  let component: AssignedtocompanygetComponent;
  let fixture: ComponentFixture<AssignedtocompanygetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedtocompanygetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedtocompanygetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
