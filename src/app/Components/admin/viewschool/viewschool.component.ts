import { Component, OnInit } from '@angular/core';
import { AddschoolService } from 'src/app/services/addschool.service';

@Component({
  selector: 'app-viewschool',
  templateUrl: './viewschool.component.html',
  styleUrls: ['./viewschool.component.css']
})

export class ViewschoolComponent implements OnInit {
  schools: { sid: number; schoolName: string; location: string }[] = [];

  constructor(private schoolService: AddschoolService) {}

  ngOnInit(): void {
    this.getSchools();
  }

  getSchools(): void {
    this.schoolService.getSchools().subscribe(
      (schools) => {
        this.schools = schools;
      },
      (error) => {
        console.error('Error fetching schools', error);
      }
    );
  }

  deleteSchool(id: number): void {
    this.schoolService.deleteSchool(id).subscribe(
      () => {
        // If deletion is successful, update the schools array
        console.log(Response);
        this.schools = this.schools.filter((school) => school.sid !== id);
        console.log(this.schools);
      },
      (error) => {
        console.error('Error deleting school', error);
      }
    );
  }
}