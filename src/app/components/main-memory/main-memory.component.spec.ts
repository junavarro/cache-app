import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMemoryComponent } from './main-memory.component';

describe('MainMemoryComponent', () => {
  let component: MainMemoryComponent;
  let fixture: ComponentFixture<MainMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMemoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
