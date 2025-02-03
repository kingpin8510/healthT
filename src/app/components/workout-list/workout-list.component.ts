import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutSummary } from '../../models/workout.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export class WorkoutListComponent implements OnInit {
  onPageChange(arg0: { first: number; rows: number }) {
    throw new Error('Method not implemented.');
  }
  getSeverity(arg0: number): any {
    throw new Error('Method not implemented.');
  }
  formatDate(date: Date): any {
    throw new Error('Method not implemented.');
  }
  searchControl = new FormControl('');
  filterControl = new FormControl('');
  pageSizeControl = new FormControl(5);

  workoutSummaries: WorkoutSummary[] = [];
  filteredSummaries: WorkoutSummary[] = [];
  displayedSummaries: WorkoutSummary[] = [];

  currentPage = 1;
  totalPages = 1;
  workoutTypes: string[] = [
    'Running',
    'Cycling',
    'Swimming',
    'Yoga',
    'Tennis',
    'Skating',
    'Basketball',
    'Hiking',
  ];
  searchText: string = '';
  selectedWorkoutType: string = '';
  rows: number = 5;

  constructor(private workoutService: WorkoutService) {
    this.setupControls();
  }

  ngOnInit() {
    this.loadWorkouts();
    this.updateWorkoutList();
    this.workoutService.getWorkouts().subscribe(() => {
      this.updateWorkoutList();
    });
  }

  public setupControls() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.filterWorkouts());

    this.filterControl.valueChanges.subscribe(() => this.filterWorkouts());

    this.pageSizeControl.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.updateDisplayedWorkouts();
    });
  }

  public loadWorkouts() {
    this.workoutSummaries = this.workoutService.getWorkoutSummaries();
  }

  public updateWorkoutList() {
    this.workoutSummaries = this.workoutService.getWorkoutSummaries();
    this.filterWorkouts();
  }

  public filterWorkouts() {
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    const workoutType = this.filterControl.value;

    this.filteredSummaries = this.workoutSummaries.filter((summary) => {
      const matchesSearch = summary.userName.toLowerCase().includes(searchTerm);
      const matchesType =
        !workoutType || summary.workoutTypes.includes(workoutType);
      return matchesSearch && matchesType;
    });

    this.currentPage = 1;
    this.updateDisplayedWorkouts();
  }

  public updateDisplayedWorkouts() {
    const pageSize = Number(this.pageSizeControl.value);
    const startIndex = (this.currentPage - 1) * pageSize;
    this.displayedSummaries = this.filteredSummaries.slice(
      startIndex,
      startIndex + pageSize
    );
    this.totalPages = Math.ceil(this.filteredSummaries.length / pageSize);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedWorkouts();
  }
}
