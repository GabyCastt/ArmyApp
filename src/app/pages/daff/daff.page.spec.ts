import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaffPage } from './daff.page';

describe('DaffPage', () => {
  let component: DaffPage;
  let fixture: ComponentFixture<DaffPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
