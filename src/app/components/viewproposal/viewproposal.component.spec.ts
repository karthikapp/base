import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproposalComponent } from './viewproposal.component';

describe('ViewproposalComponent', () => {
  let component: ViewproposalComponent;
  let fixture: ComponentFixture<ViewproposalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewproposalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
