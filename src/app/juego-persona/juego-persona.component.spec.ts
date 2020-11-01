import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoPersonaComponent } from './juego-persona.component';

describe('JuegoPersonaComponent', () => {
  let component: JuegoPersonaComponent;
  let fixture: ComponentFixture<JuegoPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoPersonaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
