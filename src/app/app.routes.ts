import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostArticleComponent } from './pages/post-article/post-article.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ArticleComponent } from './pages/article/article.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    component: HomeComponent,
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    title: 'Profile',
    component: ProfileComponent,
  },
  {
    path: 'edit-profile',
    title: 'Edit Profile',
    component: EditProfileComponent,
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'sell',
    title: 'Sell Article',
    component: PostArticleComponent,
  },
  {
    path: 'shop',
    title: 'Shop',
    component: ShopComponent,
  },
  {
    path: 'shop/:categoryId',
    title: 'Shop',
    component: ShopComponent,
  },
  {
    path: 'shop/:categoryId/:typeId',
    title: 'Shop',
    component: ShopComponent,
  },
  {
    path: 'article/:id',
    title: 'Article',
    component: ArticleComponent,
  },
];
