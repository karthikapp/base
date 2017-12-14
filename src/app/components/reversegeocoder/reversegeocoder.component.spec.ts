import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReversegeocoderComponent } from './reversegeocoder.component';

describe('ReversegeocoderComponent', () => {
  let component: ReversegeocoderComponent;
  let fixture: ComponentFixture<ReversegeocoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReversegeocoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReversegeocoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
