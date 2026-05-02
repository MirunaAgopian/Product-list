import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  productService = inject(Products);
  detail = this.productService.productDetail;

  ngOnInit(){
    let currentName = this.route.snapshot.paramMap.get("name");
    if(currentName){
      this.productService.setProductDetailsByName(currentName);
    }
  }

    deleteDetail(){
      // this.detail.name = "";
    }
}
