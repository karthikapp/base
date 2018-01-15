import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcompanycontactnameComponent } from './getcompanycontactname.component';

describe('GetcompanycontactnameComponent', () => {
  let component: GetcompanycontactnameComponent;
  let fixture: ComponentFixture<GetcompanycontactnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcompanycontactnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcompanycontactnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
