import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product-interface';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Products {
  supabase = createClient(
    'https://bzbkozlqcpdngvilnjdx.supabase.co',
    'sb_publishable_In_KXE2lrzn1wFaYX1shLg_J3nYIEPl',
  );

  productList = signal<Product[]>([]);
  productDetail = signal<Product>({
    id: 0,
    name: 'not available',
    description: 'not available',
    specs: 'not available',
    stock: 0,
    price: 0,
  });

  addProduct(product: Product) {
    this.productList.update((list) => [...list, product]);
  }

  setProductDetailsByName(name: string) {
    let temporaryProduct = this.productList().find((product) => product.name === name);
    if (temporaryProduct) this.productDetail.set(temporaryProduct);

    //set timeout is not being triggered in Angular apps after the 2 seconds
    //so the change does not appear. it appears only if I trigger the UI with a
    //click event, it I don't trigger is though a signal
    setTimeout(() => {
      this.productDetail.update((product) => ({
        ...product,
        description: 'Descrption set with signals!!',
      }));
    }, 2000);
  }

  async getAllProducts() {
    let { data: products, error } = await this.supabase
    .from('products')
    .select('*');
    //this is how I test that I get acual data from the server - easy way
    //BUT I could also get the data from server with Model + Interfaces - complex way
    this.productList.set(products ?? [] as Product[]);
    console.log(products);
  }

  constructor() {
    this. getAllProducts();
  }
}
