import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifyUserPage } from './verify-user.page';

describe('VerifyUserPage', () => {
  let component: VerifyUserPage;
  let fixture: ComponentFixture<VerifyUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerifyUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
