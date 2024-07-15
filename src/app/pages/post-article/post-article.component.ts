import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { CategoriesService } from '../../services/categories.service';
import { ArticlesService } from '../../services/articles.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-article',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    AlertComponent,
  ],
  templateUrl: './post-article.component.html',
  styleUrl: './post-article.component.scss',
})
export class PostArticleComponent {
  public post: FormGroup;
  public badRequest: boolean = false;
  public categories: any[] = [];
  public types: any[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private service: ArticlesService,
    private router: Router
  ) {
    this.post = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(6),
        Validators.required,
      ]),
      description: new FormControl('', [
        Validators.minLength(25),
        Validators.required,
      ]),
      image: new FormControl(''),
      image2: new FormControl(''),
      image3: new FormControl(''),
      public: new FormControl(1),
      created_at: new FormControl(new Date()),
      price: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.maxLength(4), Validators.required]),
      stock: new FormControl('', [Validators.required]),
      class: new FormControl(''),
      categoryId: new FormControl('0', [Validators.required]),
      typeId: new FormControl({ value: '0', disabled: true }, [
        Validators.required,
      ]),
    });
  }

  ngOnInit() {
    this.categoriesService
      .getCategoriesTypes()
      .then((res) => {
        const c: any = res;
        this.categories = c['categories'];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  categoryChange(e: any) {
    const categoryId = this.post.value['categoryId'];
    if (categoryId !== '0') {
      this.post.get('typeId')?.enable();
      const type = this.categories.find((c) => c.id === parseInt(categoryId));
      this.types = type.types;
    } else {
      this.post.get('typeId')?.disable();
    }
  }

  postArticle() {
    this.service
      .postArticle(this.post.value)
      .then((res: any) => {
        if (res) {
          this.router.navigate([`/article/${res.postId}`]);
          console.log(res);
        }
      })
      .catch((err) => {
        this.badRequest = true;
      });
  }

  onSubmit() {
    if (this.post.valid) {
      this.postArticle();
    } else {
      this.badRequest = true;
    }
  }
}
