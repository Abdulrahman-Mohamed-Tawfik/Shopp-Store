import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsertypesComponent } from './manage-usertypes.component';

describe('ManageUsertypesComponent', () => {
  let component: ManageUsertypesComponent;
  let fixture: ComponentFixture<ManageUsertypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUsertypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUsertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
