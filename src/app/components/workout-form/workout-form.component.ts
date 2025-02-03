import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  workoutTypes = [
    { label: 'Running', value: 'Running' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Tennis', value: 'Tennis' },
    { label: 'Skating', value: 'Skating' },
    { label: 'Basketball', value: 'Basketball' },
    { label: 'Hiking', value: 'Hiking' },
  ];

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {
    this.workoutForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      workoutType: ['', Validators.required],
      minutes: [
        '',
        [Validators.required, Validators.min(1), Validators.max(300)],
      ],
    });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      this.workoutService.addWorkout({
        ...this.workoutForm.value,
        date: new Date(),
      });
      this.workoutForm.reset();
    }
  }
}
