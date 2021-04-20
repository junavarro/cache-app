import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheL2Component } from './cache-l2.component';

describe('CacheL2Component', () => {
  let component: CacheL2Component;
  let fixture: ComponentFixture<CacheL2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CacheL2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheL2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
