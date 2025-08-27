import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TefPage } from './tef.page';

describe('TefPage', () => {
  let component: TefPage;
  let fixture: ComponentFixture<TefPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
