import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartInterface } from '../../../interfaces/PartInterface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PartInterface,
  ) {}

  ngOnInit() {
  }

}
