import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedtoproductgetComponent } from './assignedtoproductget.component';

describe('AssignedtoproductgetComponent', () => {
  let component: AssignedtoproductgetComponent;
  let fixture: ComponentFixture<AssignedtoproductgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedtoproductgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedtoproductgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
