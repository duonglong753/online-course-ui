import { Component } from '@angular/core';
import { BrowseCourseComponent } from '../browse-course/browse-course.component';

@Component({
  selector: 'app-course-by-category',
  standalone: true,
  imports: [BrowseCourseComponent],
  templateUrl: './course-by-category.component.html',
  styleUrl: './course-by-category.component.css'
})
export class CourseByCategoryComponent implements ngOnInit {
  categoryId: number = 0;
  constructor(private route: ActivatedRoute) {

  }
  ngOninit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('categoryId'));
    })
  }
}
