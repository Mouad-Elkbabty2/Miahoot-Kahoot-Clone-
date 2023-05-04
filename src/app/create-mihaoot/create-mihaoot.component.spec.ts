import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMihaootComponent } from './create-mihaoot.component';

describe('CreateMihaootComponent', () => {
  let component: CreateMihaootComponent;
  let fixture: ComponentFixture<CreateMihaootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMihaootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMihaootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
