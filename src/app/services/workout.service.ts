import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workout, WorkoutSummary } from '../models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly STORAGE_KEY = 'workouts';
  private workouts: Workout[] = [
    {
      id: '1',
      userName: 'John Doe',
      workoutType: 'Running',
      minutes: 30,
      date: new Date(),
    },
    {
      id: '2',
      userName: 'Jane Smith',
      workoutType: 'Swimming',
      minutes: 45,
      date: new Date(),
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      workoutType: 'Yoga',
      minutes: 60,
      date: new Date(),
    },
  ];

  private workoutsSubject = new BehaviorSubject<Workout[]>(this.workouts);

  constructor() {
    this.loadFromLocalStorage();
  }

  getWorkouts(): Observable<Workout[]> {
    return this.workoutsSubject.asObservable();
  }

  addWorkout(workout: Omit<Workout, 'id'>) {
    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
    };
    this.workouts.push(newWorkout);
    this.updateWorkouts();
  }

  getWorkoutSummaries(): WorkoutSummary[] {
    const summaryMap = new Map<string, WorkoutSummary>();

    this.workouts.forEach((workout) => {
      if (!summaryMap.has(workout.userName)) {
        summaryMap.set(workout.userName, {
          userName: workout.userName,
          workoutTypes: [],
          totalWorkouts: 0,
          totalMinutes: 0,
        });
      }

      const summary = summaryMap.get(workout.userName)!;
      if (!summary.workoutTypes.includes(workout.workoutType)) {
        summary.workoutTypes.push(workout.workoutType);
      }
      summary.totalWorkouts++;
      summary.totalMinutes += workout.minutes;
    });

    return Array.from(summaryMap.values());
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.workouts = JSON.parse(stored);
      this.updateWorkouts();
    }
  }

  private updateWorkouts() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.workouts));
    this.workoutsSubject.next(this.workouts);
  }
}
