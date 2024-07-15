import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ArticlesService } from '../../services/articles.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ButtonComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  public articles: any[] = [];
  public categoryId: string | null = null;
  public typeId: string | null = null;

  constructor(
    private service: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('categoryId');
      this.typeId = params.get('typeId');
      if (this.typeId) {
        this.getArticlesByType();
      } else if (this.categoryId) {
        this.getArticlesByCategories();
      } else {
        this.getAllArticles();
      }
      console.log(this.categoryId);
      console.log(this.typeId);
    });
  }

  getArticlesByType() {
    this.service
      .getPostByType(this.typeId || '')
      .then((res: any) => {
        this.articles = res.posts;
        console.log(this.articles);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  getArticlesByCategories() {
    this.service
      .getPostByCategory(this.categoryId || '')
      .then((res: any) => {
        this.articles = res.posts;
        console.log(this.articles);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  getAllArticles() {
    this.service
      .getPost()
      .then((res: any) => {
        this.articles = res.posts;
        console.log(this.articles);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  goToArticle(id: number) {
    this.router.navigate([`article/${id}`]);
  }

  goToSell() {
    this.router.navigate(['/sell']);
  }
}
