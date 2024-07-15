import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    console.log(this.category);
  }

  goToCategory() {
    this.router.navigate([`shop/${this.category.id}`]);
  }

  goToType(id: string) {
    this.router.navigate([`shop/${this.category.id}/${id}`]);
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
