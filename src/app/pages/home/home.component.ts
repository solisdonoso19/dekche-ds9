import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    ButtonComponent,
    FooterComponent,
    CategoriesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public categories: any;
  public damas: any[] = [];
  public caballeros: any[] = [];
  public ninos: any[] = [];
  public accesorios: any[] = [];

  constructor(private categoriesService: CategoriesService) {}
  ngOnInit() {
    this.categoriesService
      .getCategoriesTypes()
      .then((res) => {
        const c: any = res;
        this.categories = c['categories'];
        this.categories.forEach((c: any) => {
          if (c['category']) {
            //@ts-ignore
            switch (c.category) {
              case 'Damas':
                this.damas = c;
                break;
              case 'Caballeros':
                this.caballeros = c;
                break;
              case 'Niños':
                this.ninos = c;
                break;
              case 'Accesorios':
                this.accesorios = c;
                break;
              default:
                break;
            }
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
