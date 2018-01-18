import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignednameduplicatesComponent } from './assignednameduplicates.component';

describe('AssignednameduplicatesComponent', () => {
  let component: AssignednameduplicatesComponent;
  let fixture: ComponentFixture<AssignednameduplicatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignednameduplicatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignednameduplicatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
