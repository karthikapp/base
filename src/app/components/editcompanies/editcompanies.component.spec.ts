import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcompaniesComponent } from './editcompanies.component';

describe('EditcompaniesComponent', () => {
  let component: EditcompaniesComponent;
  let fixture: ComponentFixture<EditcompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
