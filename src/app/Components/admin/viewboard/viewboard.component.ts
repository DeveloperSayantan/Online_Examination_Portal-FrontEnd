import { Component, OnInit } from '@angular/core';
import { AddboardService } from 'src/app/services/addboard.service';

@Component({
  selector: 'app-viewboard',
  templateUrl: './viewboard.component.html',
  styleUrls: ['./viewboard.component.css']
})
export class ViewboardComponent implements OnInit {
  boards: any[] = []; // Update the type based on your actual response structure
  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(private addboardService: AddboardService) {}

  ngOnInit() {
    this.getBoards();
  }

  getBoards() {
    this.addboardService.getBoards().subscribe(
      (data: any) => {
        this.boards = data;
      },
      (error) => {
        console.error('Error fetching boards:', error);
      }
    );
  }

  deleteBoard(id: number) {
    this.addboardService.deleteBoards(id).subscribe(
      (response: any) => {
        console.log(response); // Log the response for debugging
        // If successful, update the boards array to reflect the changes
        this.boards = this.boards.filter(board => board.bid !== id);
      },
      (error) => {
        console.error('Error deleting board', error);
        this.popupMessage = 'Failed to delete board.\nNote: Students or teachers are associated in this board.';
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