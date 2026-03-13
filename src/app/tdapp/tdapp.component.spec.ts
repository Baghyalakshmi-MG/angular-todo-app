import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TDappComponent } from './tdapp.component';

describe('TDappComponent', () => {
  let component: TDappComponent;
  let fixture: ComponentFixture<TDappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TDappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TDappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
