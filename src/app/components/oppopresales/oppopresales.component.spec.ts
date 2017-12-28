import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppopresalesComponent } from './oppopresales.component';

describe('OppopresalesComponent', () => {
  let component: OppopresalesComponent;
  let fixture: ComponentFixture<OppopresalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppopresalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppopresalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
