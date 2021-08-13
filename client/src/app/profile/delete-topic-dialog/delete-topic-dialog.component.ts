import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-topic-dialog',
  templateUrl: './delete-topic-dialog.component.html',
  styleUrls: ['./delete-topic-dialog.component.css']
})
export class DeleteTopicDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  no(){
    this.dialogRef.close(false);
  }
  yes(){
    this.dialogRef.close(true);
  }

  ngOnInit(): void {
  }

}
