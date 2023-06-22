import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeCreateModalComponent } from './theme-create-modal.component';

describe('ThemeCreateModalComponent', () => {
  let component: ThemeCreateModalComponent;
  let fixture: ComponentFixture<ThemeCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeCreateModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
