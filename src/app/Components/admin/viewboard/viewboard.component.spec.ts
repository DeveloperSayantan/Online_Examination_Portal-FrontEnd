import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewboardComponent } from './viewboard.component';

describe('ViewboardComponent', () => {
  let component: ViewboardComponent;
  let fixture: ComponentFixture<ViewboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewboardComponent]
    });
    fixture = TestBed.createComponent(ViewboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
