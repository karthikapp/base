import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcompanycontactsComponent } from './getcompanycontacts.component';

describe('GetcompanycontactsComponent', () => {
  let component: GetcompanycontactsComponent;
  let fixture: ComponentFixture<GetcompanycontactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetcompanycontactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetcompanycontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
