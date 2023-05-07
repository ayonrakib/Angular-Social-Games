import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVotersComponent } from './show-voters.component';

describe('ShowVotersComponent', () => {
  let component: ShowVotersComponent;
  let fixture: ComponentFixture<ShowVotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowVotersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
