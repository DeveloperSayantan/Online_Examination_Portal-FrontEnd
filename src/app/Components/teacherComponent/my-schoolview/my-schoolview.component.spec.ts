import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySchoolviewComponent } from './my-schoolview.component';

describe('MySchoolviewComponent', () => {
  let component: MySchoolviewComponent;
  let fixture: ComponentFixture<MySchoolviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySchoolviewComponent]
    });
    fixture = TestBed.createComponent(MySchoolviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
