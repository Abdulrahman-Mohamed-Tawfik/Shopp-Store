import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ManageProductsComponent } from './pages/admin/manage-products/manage-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './pages/details/details.component';
import { SlideShowComponent } from './components/slide-show/slide-show.component';
import { ManageUsertypesComponent } from './pages/admin/manage-usertypes/manage-usertypes.component';
import { AddUsertypeComponent } from './pages/admin/add-usertype/add-usertype.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    FeaturedProductsComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    CategoriesComponent,
    AboutComponent,
    ProfileComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AddProductComponent,
    ManageProductsComponent,
    DetailsComponent,
    SlideShowComponent,
    ManageUsertypesComponent,
    AddUsertypeComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
