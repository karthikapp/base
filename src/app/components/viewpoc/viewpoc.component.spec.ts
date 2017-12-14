import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpocComponent } from './viewpoc.component';

describe('ViewpocComponent', () => {
  let component: ViewpocComponent;
  let fixture: ComponentFixture<ViewpocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
