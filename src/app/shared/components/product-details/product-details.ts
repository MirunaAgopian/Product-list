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
  
  //this is the default case if I don't have any data in JSON
  detail = {
      name: 'not available',
      description: 'not available',
      specs: 'not available',
      stock: 0,
      price: 0,
    }

  ngOnInit(){
    let currentName = this.route.snapshot.paramMap.get("name");
    if(currentName){
      this.productService.setProductDetailsByName(currentName);
    }
     this.detail = this.productService.productDetail;
  }

    deleteDetail(){
      this.detail.name = "";
    }
}
