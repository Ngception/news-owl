import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  constructor() { }

  ngOnInit() {
  }

}
