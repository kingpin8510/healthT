export interface Workout {
  id: string;
  userName: string;
  workoutType: string;
  minutes: number;
  date: Date;
}

export interface WorkoutSummary {
  userName: string;
  workoutTypes: string[];
  totalWorkouts: number;
  totalMinutes: number;
}
