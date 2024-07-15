import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles.services';
import { ButtonComponent } from '../../components/button/button.component';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    DatePipe,
    SlicePipe,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  public articleId: string | null = '';
  public article: any;
  public articles: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private service: ArticlesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.articleId = params.get('id');
      this.getArticle();
    });

    this.service
      .getPost()
      .then((res: any) => {
        this.articles = res.posts;
        this.articles = this.articles.filter(
          (i) => i.id !== parseInt(this.articleId || '')
        );
        console.log(this.articles);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  getArticle() {
    this.service
      .getPostById(this.articleId || '0')
      .then((res: any) => {
        this.article = res.post;
        console.log(this.article);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  addToCart() {
    const body = {
      productId: this.article.id,
      quantity: 1,
      price: this.article.price,
      total: this.article.price,
    };
    this.service
      .addToCart(body)
      .then((res: any) => {})
      .catch((err: any) => {
        console.error(err);
      });
  }

  goToArticle(id: number) {
    this.router.navigate([`article/${id}`]);
  }
}
