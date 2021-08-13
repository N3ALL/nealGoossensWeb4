import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestProfileScreenComponent } from './guest-profile-screen.component';

describe('GuestProfileScreenComponent', () => {
  let component: GuestProfileScreenComponent;
  let fixture: ComponentFixture<GuestProfileScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestProfileScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestProfileScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
