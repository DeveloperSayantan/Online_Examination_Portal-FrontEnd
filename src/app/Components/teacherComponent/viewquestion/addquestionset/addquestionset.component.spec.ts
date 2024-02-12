import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquestionsetComponent } from './addquestionset.component';

describe('AddquestionsetComponent', () => {
  let component: AddquestionsetComponent;
  let fixture: ComponentFixture<AddquestionsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddquestionsetComponent]
    });
    fixture = TestBed.createComponent(AddquestionsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
