import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LissPage } from './liss.page';

describe('LissPage', () => {
  let component: LissPage;
  let fixture: ComponentFixture<LissPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LissPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
