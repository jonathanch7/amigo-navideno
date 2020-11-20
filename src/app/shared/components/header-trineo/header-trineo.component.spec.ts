import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTrineoComponent } from './header-trineo.component';

describe('HeaderTrineoComponent', () => {
  let component: HeaderTrineoComponent;
  let fixture: ComponentFixture<HeaderTrineoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTrineoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTrineoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
