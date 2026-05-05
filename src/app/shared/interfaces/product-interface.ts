//Use an interface when you only need the shape of data.
//Use an interface when:
//You receive data from Supabase
//You send data to Supabase
//You only need typing
//You don’t need methods
//You don’t need constructors
//You don’t need logic

export interface Product {
    id: number | undefined;
    name: string;
    description: string;
    specs: string;
    stock: number;
    price: number;
}
