import { Component, Input } from '@angular/core';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-dashboardheader',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardheaderComponent {
  studentDetails: StudentDetails | null = null;
  // @Input() studentDetails: StudentDetails | null = null;

  constructor(private studentService: StudentsService) {}

  ngOnInit() {
    // Retrieve the student details from the service
    this.studentDetails = this.studentService.getStudentDetails();
  }
}
