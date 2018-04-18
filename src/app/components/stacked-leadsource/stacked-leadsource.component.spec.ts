import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedLeadsourceComponent } from './stacked-leadsource.component';

describe('StackedLeadsourceComponent', () => {
  let component: StackedLeadsourceComponent;
  let fixture: ComponentFixture<StackedLeadsourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackedLeadsourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackedLeadsourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
