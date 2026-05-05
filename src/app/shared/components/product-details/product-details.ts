import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  //in this way I get to insert the product name in the URL
  private route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(Products);
  detail = this.productService.productDetail;

  ngOnInit() {
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) {
      this.productService.setProductDetailsById(currentId);
    }
  }

  async deleteDetail() {
    const id = this.detail().id;
    if (id !== undefined) {
      this.productService.deleteProduct(id);
      this.router.navigate(['']);
    }
    this.router.navigate(['']);
  }
}
