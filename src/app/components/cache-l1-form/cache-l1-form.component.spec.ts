import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheL1FormComponent } from './cache-l1-form.component';

describe('CacheL1FormComponent', () => {
  let component: CacheL1FormComponent;
  let fixture: ComponentFixture<CacheL1FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheL1FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheL1FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
