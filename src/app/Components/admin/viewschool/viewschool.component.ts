import { Component, OnInit } from '@angular/core';
import { AddschoolService } from 'src/app/services/addschool.service';

@Component({
  selector: 'app-viewschool',
  templateUrl: './viewschool.component.html',
  styleUrls: ['./viewschool.component.css']
})

export class ViewschoolComponent implements OnInit {
  schools: { sid: number; schoolName: string; location: string }[] = [];
  showPopup: boolean = false;
  popupMessage: string = '';

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
        this.schools = this.schools.filter((school) => school.sid !== id);
        console.log(this.schools);
      },
      (error) => {
        console.error('Error deleting school', error);
        this.popupMessage = 'Failed to delete school.\nNote: Students or teachers are associated in this school.';
        this.showPopup = true;
        setTimeout(() => {
          this.hidePopup();
        }, 4000); // Automatically hide after 3 seconds
      }
    );
  }

  hidePopup(): void {
    this.showPopup = false;
  }
}