import { Component, OnInit } from '@angular/core';
import {
  RouterOutlet,
  RouterModule,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { providePrimeNG } from 'primeng/config';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { WorkoutService } from '../app/services/workout.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule,
    MatChipsModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'workout-tracker';
}
