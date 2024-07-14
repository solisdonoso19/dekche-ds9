import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-post-article',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './post-article.component.html',
  styleUrl: './post-article.component.scss',
})
export class PostArticleComponent {}
