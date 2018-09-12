import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofcontactComponent } from './typeofcontact.component';

describe('TypeofcontactComponent', () => {
  let component: TypeofcontactComponent;
  let fixture: ComponentFixture<TypeofcontactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeofcontactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeofcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
