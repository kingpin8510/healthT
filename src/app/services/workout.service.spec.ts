import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { Workout, WorkoutSummary } from '../models/workout.model';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let localStorageMock: any;

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {
      getItem: jasmine.createSpy('getItem'),
      setItem: jasmine.createSpy('setItem'),
    };

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    TestBed.configureTestingModule({
      providers: [WorkoutService],
    });
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get workouts as observable', (done) => {
    service.getWorkouts().subscribe((workouts) => {
      expect(workouts.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a new workout', () => {
    const initialLength = service.getWorkoutSummaries().length;
    const newWorkout: Omit<Workout, 'id'> = {
      userName: 'New User',
      workoutType: 'Cycling',
      minutes: 45,
      date: new Date(),
    };

    service.addWorkout(newWorkout);
    const updatedSummaries = service.getWorkoutSummaries();

    expect(updatedSummaries.length).toBeGreaterThan(initialLength);
    expect(
      updatedSummaries.some((summary) => summary.userName === 'New User')
    ).toBeTrue();
  });

  it('should generate correct workout summaries', () => {
    const summaries = service.getWorkoutSummaries();

    expect(summaries.length).toBeGreaterThan(0);
    const johnSummary = summaries.find((s) => s.userName === 'John Doe');

    expect(johnSummary).toBeTruthy();
    expect(johnSummary?.workoutTypes).toContain('Running');
    expect(johnSummary?.totalWorkouts).toBeGreaterThan(0);
  });

  it('should load from localStorage on initialization', () => {
    const mockStoredWorkouts: Workout[] = [
      {
        id: '4',
        userName: 'Test User',
        workoutType: 'Swimming',
        minutes: 30,
        date: new Date(),
      },
    ];

    localStorageMock.getItem.and.returnValue(
      JSON.stringify(mockStoredWorkouts)
    );

    // Re-create service to trigger localStorage load
    service = new WorkoutService();
    const summaries = service.getWorkoutSummaries();

    expect(summaries.some((s) => s.userName === 'Test User')).toBeTrue();
  });
});
