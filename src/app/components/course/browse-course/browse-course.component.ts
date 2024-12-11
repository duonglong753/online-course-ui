import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Course } from '../../../models/course';
import { MOCK_COURSES } from '../../../mock-data/mock-course';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse-course.component.html',
  styleUrl: './browse-course.component.css'
})
export class BrowseCourseComponent implements OnInit, OnChanges {
  courses: Course[] = [];
  @Input() categoryId: number = 0;
  constructor(private courseService: CourseService) {
    this.courses = MOCK_COURSES;
  }

  ngOnInit(): void {
    this.processCourse();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.processCourse();

  }

  processCourse() {
    this.getCourseByCategoryId(this.categoryId);
  }
  getCourseByCategoryId(categoryId: number) {
    this.courseService.getCoursesByCategoryId(categoryId).subscribe(data => {
      this.courses = data;
    });
  }
  formatPrice(price: number): string {
    return `${price.toFixed(2)}`;
  }
}
