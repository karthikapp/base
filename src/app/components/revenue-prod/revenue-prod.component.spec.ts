import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueProdComponent } from './revenue-prod.component';

describe('RevenueProdComponent', () => {
  let component: RevenueProdComponent;
  let fixture: ComponentFixture<RevenueProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
