import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopicScreenComponent } from './profile-topic-screen.component';

describe('ProfileTopicScreenComponent', () => {
  let component: ProfileTopicScreenComponent;
  let fixture: ComponentFixture<ProfileTopicScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileTopicScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopicScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
