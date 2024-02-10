import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit{
  students: any[] = [];
  filteredStudents: any[] = [];
  searchClass: string = '';

  constructor(private techerService: TeacherService) { }

  ngOnInit(): void {
    this.getStudentsFromSameSchool();
  }

  getStudentsFromSameSchool() {
    // Call the service to fetch all students
    this.techerService.getStudentData().subscribe(
      (students: any[]) => {
        this.students = students;
        this.filterStudents(); // Initially filter students
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }

  filterStudents() {
    // Filter students by class
    this.filteredStudents = this.students.filter(student => student.cls.toLowerCase().includes(this.searchClass.toLowerCase()));
  }
}
