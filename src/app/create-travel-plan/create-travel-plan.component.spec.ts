import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTravelPlanComponent } from './create-travel-plan.component';

describe('CreateTravelPlanComponent', () => {
  let component: CreateTravelPlanComponent;
  let fixture: ComponentFixture<CreateTravelPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTravelPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTravelPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
