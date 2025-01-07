import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null = null;
  categories: any[] = [];

  constructor(private productService: ProductsService, private categoriesService: CategoriesService) {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      sizes: new FormControl('', [Validators.required]),
      colors: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      isFeatured: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const selectedCategoryName = this.productForm.value.category;

      const selectedCategory = this.categories.find(
        (category) => category.name === selectedCategoryName
      );

      const categoryId = selectedCategory ? selectedCategory._id : null;

      const sizesArray = this.productForm.value.sizes.split(',').map((size: string) => size.trim());
      const colorsArray = this.productForm.value.colors.split(',').map((color: string) => color.trim());



      const productData = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        category: categoryId,
        price: this.productForm.value.price,
        sizes: sizesArray,
        colors: colorsArray,
        stock: this.productForm.value.stock,
        isFeatured: this.productForm.value.isFeatured,

      };
      console.log("data:", productData);
      
      this.productService.createProduct(productData, this.selectedFile).subscribe({
        next: (response) => {
          console.log('Product created successfully:', response);
          this.productForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Error creating product:', err);
          alert(err.message);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }


}
