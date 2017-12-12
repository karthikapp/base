import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadoppoComponent } from './leadoppo.component';

describe('LeadoppoComponent', () => {
  let component: LeadoppoComponent;
  let fixture: ComponentFixture<LeadoppoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadoppoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadoppoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
