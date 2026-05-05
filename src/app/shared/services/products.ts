import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product-interface';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class Products {
  supabase = createClient(
    'https://bzbkozlqcpdngvilnjdx.supabase.co',
    'sb_publishable_In_KXE2lrzn1wFaYX1shLg_J3nYIEPl',
  );

  //global variables
  productList = signal<Product[]>([]);
  productDetail = signal<Product>({
    id: 0,
    name: 'not available',
    description: 'not available',
    specs: 'not available',
    stock: 0,
    price: 0,
  });

  productListInsertChannel: RealtimeChannel | null = null;
  productListDeleteChannel: RealtimeChannel | null = null;

  constructor() {
    //load the initial lost of products
    this.getAllProducts();

    //Listen to the database.
    this.listenForProductInsertEvents();
    this.listenToDeleteProduct();
  }

  //function to GET data from server when the app starts
  //if I rely only on this function, if I post a new product, it is being saved on Supabase BUT
  //in order to see it in the UI, I would need to refresh the app
  //that is why I created listenForProductInsertEvents() to Update the UI
  async getAllProducts() {
    let { data: products, error } = await this.supabase.from('products').select('*');
    //this is how I test that I get acual data from the server - easy way
    this.productList.set(products ?? ([] as Product[]));

    //BUT I could also get the data from server with Model + Interfaces - complex way
  }

  //function to make DB changes appear on UI - this updates the UI
  //If ANYONE inserts a new product, automatically update the UI in real time.
  //this is a REALTIME LISTENER - it receives data from the server in real time,
  // by opening a WEB Socket
  listenForProductInsertEvents() {
    this.productListInsertChannel = this.supabase
      .channel('custom-insert-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'products' },
        (payload) => {
          let temporaryProduct = new ProductModel(payload.new);
          this.productList.update((list) => [...list, temporaryProduct]);
        },
      )
      .subscribe();
  }

  //this function closes the WebSocket, stops listening for realtime events
  //frees memory and prevents duplicate listeners,  if the service is recreated.
  //this is a lifecicle hook and Angular calls it when it needs it
  //meaning that this hoock runs only when the user closes or reloads the app.
  ngOnDestroy() {
    if (this.productListInsertChannel) {
      this.supabase.removeChannel(this.productListInsertChannel);
    }

    if (this.productListDeleteChannel) {
      this.supabase.removeChannel(this.productListDeleteChannel);
    }
  }

  //function to POST data on server but the UI is not being updated
  async addProduct(product: ProductModel) {
    let productData = product.getCleanAddJson();
    const { data, error } = await this.supabase.from('products').insert([productData]).select();
  }

  //function to DELETE data from server
  async deleteProduct(id:number){
    const {error} = await this.supabase
    .from('products')
    .delete()
    .eq('id', id)
  }

  //Function to update UI after DELETE data from server
  listenToDeleteProduct() {
    this.productListDeleteChannel = this.supabase
      .channel('custom-delete-channel')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'products' },
        (payload) => {
          let temporaryProduct = new ProductModel(payload.old);
          this.productList.update((list) => list.filter(product => product.id != temporaryProduct.id));
        },
      )
      .subscribe();
  }

  //I need to do also code for UPDATE rows - this is available inside the project - table - API Docs!!

  setProductDetailsById(id: number) {
    let temporaryProduct = this.productList().find((product) => product.id === id);
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
}

//IMPORTANT NOTES:
//Ok. SO let's say I have a POST operation for add a product:
// this INSEERT/POST oparation triggers this event chain
//addProduct() and listenForProductInsertEvents()
//if I close the tab where I add the product Angular runs ngOnDestroy(),
// by runnig it the WeboSocket opened by listenForProductInsertEvents() is being closed
//If however later on I re-open the page where I add a product and I make a new POST request,
// the cycle restarts
