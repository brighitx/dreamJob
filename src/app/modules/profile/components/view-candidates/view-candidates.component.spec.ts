import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidatesComponent } from './view-candidates.component';

describe('ViewCandidatesComponent', () => {
  let component: ViewCandidatesComponent;
  let fixture: ComponentFixture<ViewCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
