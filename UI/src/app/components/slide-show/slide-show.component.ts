import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-slide-show',
  standalone: false,

  templateUrl: './slide-show.component.html',
  styleUrl: './slide-show.component.css'
})
export class SlideShowComponent {
  images: string[] = []; // Array of image URLs
  currentIndex: number = 0;
  staticURL = '';
  slideInterval: any;
  isClicked: boolean = false;

  constructor(private _productS: ProductsService) { }

  ngOnInit(): void {
    this.staticURL = this._productS.staticfilesURL;

    this._productS.getFeaturedProductImages().subscribe(
      (images) => {
        this.images = images;
      },
      (error) => {
        console.error('Error fetching featured product images:', error);
      }
    );
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.isClicked = false;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  nextSlideClick(): void {
    this.isClicked = true;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlideClick(): void {
    this.isClicked = true;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  startAutoSlide(): void {

    if (this.isClicked) {
      clearInterval(this.slideInterval);
      this.isClicked = false;
    }
    else {
      this.slideInterval = setInterval(() => this.nextSlide(), 5000); // Automatically switch slides every 5 seconds
    }
  }
}
