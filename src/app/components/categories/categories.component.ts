import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  @Input() idCarousel: string = '';
  @Input() categoryTitle: string = '';
  @Input() category?: any = {};
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  public scroll = 0;

  ngOnInit() {
    console.log(this.category);
  }

  scrollRight() {
    this.scroll = this.scroll + 100;
    const scrollDiv = this.scrollContainer.nativeElement as HTMLDivElement;
    scrollDiv.scrollTo({ left: this.scroll, top: 0, behavior: 'smooth' });
  }

  scrollLeft() {
    this.scroll = this.scroll - 100;
    const scrollDiv = this.scrollContainer.nativeElement as HTMLDivElement;
    scrollDiv.scrollTo({ left: this.scroll, top: 0, behavior: 'smooth' });
  }
}
