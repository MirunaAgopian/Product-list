import { Routes } from '@angular/router';
import { ProductDetails } from './shared/components/product-details/product-details';
import { ProductList } from './shared/components/product-list/product-list';

export const routes: Routes = [
    {
        path: "",
        component: ProductList
    },
    {
        path: "details",
        component: ProductDetails
    },

];
