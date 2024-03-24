import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartPagePage } from './start-page.page';

describe('StartPagePage', () => {
  let component: StartPagePage;
  let fixture: ComponentFixture<StartPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StartPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
