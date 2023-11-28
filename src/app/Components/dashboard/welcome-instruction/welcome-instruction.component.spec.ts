import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeInstructionComponent } from './welcome-instruction.component';

describe('WelcomeInstructionComponent', () => {
  let component: WelcomeInstructionComponent;
  let fixture: ComponentFixture<WelcomeInstructionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeInstructionComponent]
    });
    fixture = TestBed.createComponent(WelcomeInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
