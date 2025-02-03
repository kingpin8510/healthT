import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
} from 'chart.js';
import { WorkoutService } from '../../services/workout.service';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css'],
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
})
export class WorkoutChartComponent implements OnInit {
  chartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Workout Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes',
        },
      },
    },
  };

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.updateChartData(workouts);
    });
  }

  private updateChartData(workouts: any[]) {
    // Get unique workout types and users
    const workoutTypes = [...new Set(workouts.map((w) => w.workoutType))];
    const users = [...new Set(workouts.map((w) => w.userName))];

    // Create a map to store minutes for each user and workout type
    const userWorkoutMinutes = new Map<string, Map<string, number>>();

    // Initialize the map
    users.forEach((user) => {
      userWorkoutMinutes.set(user, new Map<string, number>());
      workoutTypes.forEach((type) => {
        userWorkoutMinutes.get(user)!.set(type, 0);
      });
    });

    // Sum up minutes for each user and workout type
    workouts.forEach((workout) => {
      const userMap = userWorkoutMinutes.get(workout.userName)!;
      const currentMinutes = userMap.get(workout.workoutType) || 0;
      userMap.set(workout.workoutType, currentMinutes + workout.minutes);
    });

    // Create datasets for the chart
    this.chartData = {
      labels: workoutTypes,
      datasets: users.map((user, index) => ({
        label: user,
        data: workoutTypes.map(
          (type) => userWorkoutMinutes.get(user)!.get(type)!
        ),
        backgroundColor: this.getColor(index),
        borderColor: this.getColor(index),
        borderWidth: 1,
      })),
    };
  }

  private getColor(index: number): string {
    const colors = [
      'rgba(75, 192, 192, 0.6)', // Turquoise
      'rgba(255, 99, 132, 0.6)', // Pink
      'rgba(54, 162, 235, 0.6)', // Blue
      'rgba(255, 206, 86, 0.6)', // Yellow
      'rgba(153, 102, 255, 0.6)', // Purple
      'rgba(255, 159, 64, 0.6)', // Orange
      'rgba(201, 203, 207, 0.6)', // Grey
      'rgba(0, 150, 136, 0.6)', // Teal
      'rgba(233, 30, 99, 0.6)', // Deep Pink
      'rgba(33, 150, 243, 0.6)', // Light Blue
      'rgba(255, 235, 59, 0.6)', // Light Yellow
      'rgba(156, 39, 176, 0.6)', // Deep Purple
      'rgba(255, 87, 34, 0.6)', // Deep Orange
      'rgba(96, 125, 139, 0.6)', // Blue Grey
      'rgba(76, 175, 80, 0.6)', // Green
      'rgba(244, 67, 54, 0.6)', // Red
      'rgba(121, 85, 72, 0.6)', // Brown
      'rgba(63, 81, 181, 0.6)', // Indigo
      'rgba(205, 220, 57, 0.6)', // Lime
      'rgba(158, 157, 36, 0.6)', // Olive
      'rgba(255, 152, 0, 0.6)', // Dark Orange
      'rgba(139, 195, 74, 0.6)', // Light Green
      'rgba(233, 30, 99, 0.6)', // Hot Pink
      'rgba(0, 188, 212, 0.6)', // Cyan
    ];
    return colors[index % colors.length];
  }
}
