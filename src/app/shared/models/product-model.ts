//Use a model (class) when you need behavior or transformation.
//Use a model when you need:
//Methods
//Computed properties
//Data transformation
//Business logic
//Default values
//Conversion from raw API data

import { Product } from "../interfaces/product-interface";

export class ProductModel implements Product {
    id: number;
    name: string;
    description: string;
    specs: string;
    stock: number;
    price: number;

    constructor(data: Partial<Product> = {}) {
        //if there is no ID then return 0
        this.id = data.id ?? 0;
        //if there is no name, return an empy string
        this.name = data.name ?? "";
        this.description = data.description ?? "";
        this.specs = "n/a";
        this.stock = data.stock ?? 0;
        this.price = data.price ?? 0;
    }
}