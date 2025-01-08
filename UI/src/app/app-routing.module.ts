import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ManageProductsComponent } from './pages/admin/manage-products/manage-products.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { authGuard } from './guards/auth.guard';
import { ManageUsertypesComponent } from './pages/admin/manage-usertypes/manage-usertypes.component';
import { DetailsComponent } from './pages/details/details.component';
import { AddUsertypeComponent } from './pages/admin/add-usertype/add-usertype.component';

const routes: Routes = [
  // { path: "", redirectTo: '/home', pathMatch: "full" },
  { path: "", redirectTo: '/home', pathMatch: "full" },
  { path: 'home', component: HomeComponent },
  { path: 'products/:categoryId', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cart/user/:userId', component: CartComponent },
  { path: 'cart/add', component: CartComponent },
  // { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin/manage-products', component: ManageProductsComponent , canActivate: [authGuard] },
  { path: 'admin/add-product', component: AddProductComponent , canActivate: [authGuard]},
  { path: 'admin/manage-usertypes', component: ManageUsertypesComponent, canActivate: [authGuard] },
  { path: 'admin/add-usertype', component: AddUsertypeComponent , canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
