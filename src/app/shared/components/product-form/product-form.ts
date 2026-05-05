import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { Products } from '../../services/products';
import { ProductModel } from '../../models/product-model';


@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  router = inject(Router);

  productService = inject(Products);

  productForm = new FormGroup({
    name: new FormControl('not available', {nonNullable:true, validators: [Validators.required, Validators.minLength(3)]}),
    description: new FormControl('not available', { nonNullable:true, validators: [Validators.required] }),
    stock: new FormControl(0, {nonNullable:true, validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl(0, {nonNullable:true, validators: [Validators.required, Validators.min(0)] }),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    if (this.productForm.valid) {
      let product = new ProductModel(this.productForm.value);
      this.productService.addProduct(product);
      this.router.navigate(['']);
    }
  }
}
