import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';

@Component({
  selector: 'app-viewteacher',
  templateUrl: './viewteacher.component.html',
  styleUrls: ['./viewteacher.component.css']
})
export class ViewteacherComponent implements OnInit {
  teachers: any[] = [];
  filteredTeachers: any[] = [];
  searchSchool: string = '';

  constructor(private adminService: AdmindashboardService, private router: Router) { }

  ngOnInit(): void {
    this.getTeachers();
  }

  getTeachers() {
    // Fetch all teachers
    this.adminService.getTeacherData().subscribe(
      (teachers: any[]) => {
        this.teachers = teachers;

        console.log(this.teachers);
        
        this.filterTeachers();
      },
      error => {
        console.error('Error fetching teachers:', error);
      }
    );
  }

  filterTeachers() {
    this.filteredTeachers = this.teachers.filter(teacher => 
      teacher.school_id && teacher.school_id.schoolName && 
      teacher.school_id.schoolName.toLowerCase().includes(this.searchSchool.toLowerCase())
    );
  }
  
}
