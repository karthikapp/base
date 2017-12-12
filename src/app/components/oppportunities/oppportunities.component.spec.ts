import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppportunitiesComponent } from './oppportunities.component';

describe('OppportunitiesComponent', () => {
  let component: OppportunitiesComponent;
  let fixture: ComponentFixture<OppportunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
