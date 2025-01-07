import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute,  Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  user: any;
  filteredProducts: any[] = [];
  categories: any[] = [];
  staticURL: string = '';
  selectedCategory: string = '';
  selectedSortOption: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;
  searchQuery: string = '';
  addedProducts: { [productId: string]: boolean } = {};
  isAdmin = false;

  constructor(
    private _productS: ProductsService,
    private _categoryS: CategoriesService,
    private _authS: AuthService,
    private _cartS: CartService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.staticURL = this._productS.staticfilesURL || this._categoryS.staticfilesURL;

    this._categoryS.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId) {
        this.fetchProductsByCategory(categoryId);
      } else {
        this.fetchAllProducts();
      }
    });
  }

  ngOnInit(): void {
    this._authS.getAccessToken().subscribe(data => {
      if (data) {
        this.user = this._authS.getDecodeToken();
      }
    });
    if (this.user.userType === 'admin') {
      this.isAdmin = true;
    }
  }

  fetchAllProducts(): void {
    this._productS.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  fetchProductsByCategory(categoryId: string): void {
    this._productS.getProductsByCategory(categoryId).subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  applyFilters(category: string): void {
    this.filteredProducts = this.products;

    if (category) {
      this.filteredProducts = this.filteredProducts.filter(
        product => (category === "allCategories") ? true : (product.category.name === category)
      );
    }

    if (this.minPrice !== 0 || this.maxPrice !== Infinity) {
      this.filteredProducts = this.filteredProducts.filter(product => {
        return (product.price >= this.minPrice) && (product.price <= this.maxPrice);
      });
    }

    if (this.searchQuery.trim() !== '') {
      this.filteredProducts = this.filteredProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.selectedSortOption) {
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
  }

  resetFilters(): void {
    this.minPrice = 0;
    this.maxPrice = Infinity;
    this.selectedCategory = '';
    this.selectedSortOption = '';
    this.searchQuery = '';

    this.filteredProducts = [...this.products];
  }

  
  addToCart(productId: any) {
    // console.log('Adding to cart:');
    // console.log('Product Id:', productId);
    // console.log('User Id:', this.user.userId);

    // Add to cart logic here
    if (this.user && productId) {
      this._cartS.addProductToCart(this.user.userId, productId, 1)
        .subscribe(
          response => {
            console.log('Product added to cart:', response);
            
            // Mark this product as added to the cart
            this.addedProducts[productId] = true;

            // Hide the "Added To Cart" message after 2 seconds
            setTimeout(() => {
              this.addedProducts[productId] = false;
            }, 2000);
          },
          error => {
            console.error('Error adding product to cart:', error);
          }
        );
    }
    else {
      this._router.navigate(["/login"]);
    }
  }


}

