import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMiahootsComponent } from './my-miahoots.component';

describe('MyMiahootsComponent', () => {
  let component: MyMiahootsComponent;
  let fixture: ComponentFixture<MyMiahootsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMiahootsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMiahootsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
