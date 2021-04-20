import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheL2FormComponent } from './cache-l2-form.component';

describe('CacheL2FormComponent', () => {
  let component: CacheL2FormComponent;
  let fixture: ComponentFixture<CacheL2FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheL2FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheL2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
