import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetaddComponent } from './targetadd.component';

describe('TargetaddComponent', () => {
  let component: TargetaddComponent;
  let fixture: ComponentFixture<TargetaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
