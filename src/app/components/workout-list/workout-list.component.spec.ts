import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutSummary } from '../../models/workout.model';
import { of } from 'rxjs';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  const mockWorkoutSummaries: WorkoutSummary[] = [
    {
      userName: 'John Doe',
      workoutTypes: ['Running', 'Cycling'],
      totalWorkouts: 2,
      totalMinutes: 120,
    },
    {
      userName: 'Jane Smith',
      workoutTypes: ['Swimming'],
      totalWorkouts: 1,
      totalMinutes: 60,
    },
  ];

  beforeEach(async () => {
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', [
      'getWorkoutSummaries',
      'getWorkouts',
    ]);

    mockWorkoutService.getWorkoutSummaries.and.returnValue(
      mockWorkoutSummaries
    );
    mockWorkoutService.getWorkouts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent, ReactiveFormsModule],
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Constructor and Initialization', () => {
    it('should load workouts and update list on init', () => {
      spyOn(component, 'loadWorkouts');
      spyOn(component, 'updateWorkoutList');
      component.ngOnInit();
      expect(component.loadWorkouts).toHaveBeenCalled();
      expect(component.updateWorkoutList).toHaveBeenCalled();
    });
  });

  describe('setupControls', () => {
    it('should filter workouts on search control change', fakeAsync(() => {
      spyOn(component, 'filterWorkouts');
      component.searchControl.setValue('John');
      tick(300);
      expect(component.filterWorkouts).toHaveBeenCalled();
    }));

    it('should filter workouts on filter control change', () => {
      spyOn(component, 'filterWorkouts');
      component.filterControl.setValue('Running');
      expect(component.filterWorkouts).toHaveBeenCalled();
    });

    it('should reset page and update displayed workouts on page size change', () => {
      spyOn(component, 'updateDisplayedWorkouts');
      component.currentPage = 5;
      component.pageSizeControl.setValue(10);
      expect(component.currentPage).toBe(1);
      expect(component.updateDisplayedWorkouts).toHaveBeenCalled();
    });
  });

  describe('loadWorkouts', () => {
    it('should fetch workout summaries from service', () => {
      component.loadWorkouts();
      expect(component.workoutSummaries).toEqual(mockWorkoutSummaries);
      expect(mockWorkoutService.getWorkoutSummaries).toHaveBeenCalled();
    });
  });

  describe('updateWorkoutList', () => {
    it('should update workouts and filter', () => {
      spyOn(component, 'filterWorkouts');
      component.updateWorkoutList();
      expect(component.workoutSummaries).toEqual(mockWorkoutSummaries);
      expect(component.filterWorkouts).toHaveBeenCalled();
    });
  });

  describe('filterWorkouts', () => {
    it('should filter by username', () => {
      component.searchControl.setValue('John');
      component.filterWorkouts();
      expect(component.filteredSummaries.length).toBe(1);
      expect(component.filteredSummaries[0].userName).toBe('John Doe');
    });

    it('should filter by workout type', () => {
      component.filterControl.setValue('Swimming');
      component.filterWorkouts();
      expect(component.filteredSummaries.length).toBe(1);
      expect(component.filteredSummaries[0].userName).toBe('Jane Smith');
    });

    it('should handle empty search and filter', () => {
      component.searchControl.setValue('');
      component.filterControl.setValue('');
      component.filterWorkouts();
      expect(component.filteredSummaries.length).toBe(2);
    });

    it('should reset page to 1 after filtering', () => {
      component.currentPage = 5;
      component.filterWorkouts();
      expect(component.currentPage).toBe(1);
    });
  });

  describe('updateDisplayedWorkouts', () => {
    it('should slice workouts based on page and page size', () => {
      component.filteredSummaries = mockWorkoutSummaries;
      component.pageSizeControl.setValue(1);
      component.currentPage = 2;
      component.updateDisplayedWorkouts();
      expect(component.displayedSummaries.length).toBe(1);
      expect(component.displayedSummaries[0].userName).toBe('Jane Smith');
    });

    it('should calculate total pages correctly', () => {
      component.filteredSummaries = mockWorkoutSummaries;
      component.pageSizeControl.setValue(1);
      component.updateDisplayedWorkouts();
      expect(component.totalPages).toBe(2);
    });
  });

  describe('getPages', () => {
    it('should return array of page numbers', () => {
      component.totalPages = 3;
      const pages = component.getPages();
      expect(pages).toEqual([1, 2, 3]);
    });
  });

  describe('setPage', () => {
    it('should set current page and update displayed workouts', () => {
      spyOn(component, 'updateDisplayedWorkouts');
      component.setPage(3);
      expect(component.currentPage).toBe(3);
      expect(component.updateDisplayedWorkouts).toHaveBeenCalled();
    });
  });

  describe('Error Methods', () => {
    it('should throw error for onPageChange', () => {
      expect(() =>
        component.onPageChange({ first: 0, rows: 5 })
      ).toThrowError();
    });

    it('should throw error for getSeverity', () => {
      expect(() => component.getSeverity(1)).toThrowError();
    });

    it('should throw error for formatDate', () => {
      expect(() => component.formatDate(new Date())).toThrowError();
    });
  });
});
