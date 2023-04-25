import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMiahootComponentComponent } from './edit-miahoot-component.component';

describe('EditMiahootComponentComponent', () => {
  let component: EditMiahootComponentComponent;
  let fixture: ComponentFixture<EditMiahootComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMiahootComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMiahootComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
