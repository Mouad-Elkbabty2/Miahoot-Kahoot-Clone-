import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMiahootComponent } from './new-miahoot.component';

describe('NewMiahootComponent', () => {
  let component: NewMiahootComponent;
  let fixture: ComponentFixture<NewMiahootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMiahootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMiahootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
